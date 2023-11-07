const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { UserInputError } = require('apollo-server')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author');
const User = require('./models/user')


require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET
const PASSWORD = process.env.PASSWORD

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks( author: String, genre: String) : [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
    title: String!
    published: Int!
    author: String!
    genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
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
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const foundBook = await Book.findOne({ title: args.title })
      const foundAuthor = await Author.findOne({ name: args.author})
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('user not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
      }

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
      
      const newAutor = await Author.findOne({ name: args.author})

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
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({name: args.name})
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('user not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

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
      }, 
    
      createUser: (root, args) => {
        const user = new User({ username: args.username , favoriteGenre: args.favoriteGenre})
      
        return user.save()
        .catch( error => {
          throw new GraphQLError('Saving user failed', {
            extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args,
                error
            }
          })
        })

      },

      login: async (root, args) => {
        const user = await User.findOne({username: args.username})

        if ( !user || args.password !== PASSWORD){
          throw new GraphQLError('Wrong credentials', {
            extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args,
                error
            }
          })
        }

        const userForToken = {
          username: user.username,
          id: user._id
        }

        return { value: jwt.sign(userForToken, JWT_SECRET)}

      }
    }
    
}
  
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
  
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const token = auth.substring(7);
      
      try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      } catch (error) {
        // Personaliza el mensaje de error con información adicional
        throw new GraphQLError(`Error decoding token: ${error.message}`);
      }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})