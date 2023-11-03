const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { UserInputError } = require('apollo-server')


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
    bookCount: (root) => {
      const author = authors.find((author) => author.name === root.name);
      if (!author) {
        return 0;
      }
      return books.filter((book) => book.author === author.name).length;
    },
  },

  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allAuthors: () => authors,
    allBooks: (root, args) => {
      if (args.author) {
        const authorBooks = books.filter((book) => book.author === args.author)
      return authorBooks
      }
      if (args.genre){
        const genreBooks = books.filter((book) => book.genres.includes(args.genre) )
        return genreBooks
      }
      return books
    }
  },

  Mutation: {
    addBook: async (root, args) => {
    
      const foundBook = await Book.findOne({ title: args.title })
      const foundAuthor = await Author.findOne({ name: args.author})

      if (foundBook) {
        throw new UserInputError('Book already exists',{invalidArgs: args.title}) 
      }

      if (!foundAuthor) {
        const author = new Author(({name: args.author}))
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message , {
            invalidArgs: args
          })
        }
      }
      
      const newAutor = await Author.findOne({ name: args.author, born: null})

      const book = new Book({ ...args, author: newAutor })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(author => author.name === args.name)

      if (!author) {
        return null
      }

      const updateAuthor = {...author, born: args.setBornTo}
      authors = authors.map(author => author.name === args.name ? updateAuthor : author)
      return updateAuthor
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