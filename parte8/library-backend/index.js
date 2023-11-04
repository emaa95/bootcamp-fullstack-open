const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { UserInputError } = require('apollo-server')
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author');

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting...')

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB', error.message)
  })

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    bookCount: Int!
    born: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks( author: String, genre: String) : [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
    title: String!
    published: Int!
    author: String!
    genres: [String!]!
    ): Book,
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const foundAuthor = await Author.findOne({name : root.name})
      const foundBooks = await Book.find({ author: foundAuthor.id})
      return foundBooks.length
    },
  },

  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => await Author.find({}),
    allBooks: async (root, args) => {

      const foundAuthor = await Author.findOne({ name: args.author })
      if (args.author) {

        return  await Book.find({ author: foundAuthor.id }).populate('author')
      }
      if (args.genre){
        return Book.find({ genres: { $in: [args.genre]}})
      }
      return Book.find({}).populate('author')
    }
  },

  Mutation: {
    addBook: async (root, args) => {
    
      const foundBook = await Book.findOne({ title: args.title })
      const foundAuthor = await Author.findOne({ name: args.author})

      if (foundBook) {
        throw new GraphQLError('Book already exists', {
          extensions: {
              code: "BAD_REQUEST",
              invalidArgs: args.title,
          }
        }
       ) 
      }

      if (!foundAuthor) {
        const author = new Author(({name: args.author}))
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
                code: "BAD_REQUEST_INPUT",
                invalidArgs: args.author,
                error
            }
          }
         ) 
        }
      }
      
      const newAutor = await Author.findOne({ name: args.author, born: null})

      const book = new Book({ ...args, author: newAutor })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
              code: "BAD_REQUEST",
              invalidArgs: args,
              error
          }
        }
       ) 
      }
      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({name: args.name})

      if (!author) {
        throw new GraphQLError('Author not found', {
          extensions: {
              code: "BAD_REQUEST",
              invalidArgs: args.name,
          }
        }
       ) 
      }

      author.born = args.setBornTo

      try {
        await author.save()
      } catch(error) {
         throw new UserInputError(error.message, {
          invalidArgs: args,
        })
          }
        return author
    }
    
  }
  
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})