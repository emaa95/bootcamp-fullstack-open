const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

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
          return Book.find({ genres: { $in: [args.genre]}}).populate('author')
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
        pubsub.publish('BOOK_ADDED', { bookAdded: book }) 
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
            try {
              const user = await User.findOne({ username: args.username });
          
              if (!user || args.password !== process.env.PASSWORD) {
                console.error('Wrong credentials:', args);
                throw new GraphQLError('Wrong credentials', {
                  extensions: {
                    code: "BAD_USER_INPUT",
                    invalidArgs: args,
                  }
                });
              }
          
              const userForToken = {
                username: user.username,
                id: user._id
              };
          
              return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
            } catch (error) {
              throw new GraphQLError('Internal server error during login', {
                extensions: {
                  code: "INTERNAL_SERVER_ERROR",
                  error: error.message,
                }
              });
            }
          }
    },

    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
    }

    
      
}

module.exports = resolvers