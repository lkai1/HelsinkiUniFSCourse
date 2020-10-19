const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/User')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.SECRET
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
    type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }
    type Subscription {
      bookAdded: Book!
    }
    type Token {
      value: String!
    }
    type Author {
      name: String!
      id: ID!
      born: Int
      bookCount: Int
    }
    type Book {
      title: String!
      published: Int!
      author: Author!
      id: ID!
      genres: [String!]!
    }
    type Mutation {
      createUser(
        username: String!
      ): User
      login(
        username: String!
        password: String!
      ): Token
      addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
      ): Book
      editAuthor(
        name: String!
        setBornTo: Int!
        ): Author
    }
    type Query {
      me: User
      authorCount: Int!
      bookCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
    }
  `

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({})
      const booksArray = []
      for (let i = 0; i < books.length; i++) {
        const author = await Author.findOne(books[i].author)
        const hi = { author, ...books[i] }
        const book = {
          genres: books[i].genres,
          title: books[i].title,
          published: books[i].published,
          author: {
            name: hi.author.name
          },
          id: books[i].id
        }
        booksArray.push(book)
      }
      return booksArray

      /* if (args.author === undefined && args.genre === undefined) {
        return books
      } else if (args.author !== undefined && args.genre === undefined) {
        return books.filter(b => b.author === args.author).map(b => {
          return {
            title: b.title
          }
        })
      } else if (args.author === undefined && args.genre !== undefined) {
        const booksByGenre = []
        books.forEach((b) => {
          if (b.genres.includes(args.genre)) {
            booksByGenre.push({
              title: b.title,
              author: b.author
            })
          }
        })
        return booksByGenre
      } else if (args.author !== undefined && args.genre !== undefined) {
        const booksByGenre = []
        books.filter(b => b.author === args.author).forEach((b) => {
          if (b.genres.includes(args.genre)) {
            booksByGenre.push({
              title: b.title,
              author: b.author
            })
          }
        })
        return booksByGenre
      } */
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    }
  },
  Author: {
    bookCount: async (root) => {
      const allBooks = await Book.find({ author: root.id })
      return allBooks.length
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  },
  Mutation: {
    createUser: (root, args) => {
      const user = new User({ username: args.username })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'sala') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const matchingAuthor = await Author.findOne({ name: args.author })

      if (matchingAuthor) {
        const book = new Book({
          title: args.title,
          published: args.published,
          author: matchingAuthor,
          genres: args.genres
        })

        try {
          await book.save()
        } catch (error) {
          console.log('ERROR: ', error.message)
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      } else {
        const newAuthor = new Author({
          name: args.author,
          born: null,
          bookCount: 1
        })
        try {
          await newAuthor.save()
        } catch (error) {
          console.log('ERROR: ', error.message)
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        const book = new Book({
          title: args.title,
          published: args.published,
          author: newAuthor,
          genres: args.genres
        })
        try {
          await book.save()
        } catch (error) {
          console.log('ERROR: ', error.message)
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const updatedAuthor = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo })
      try {
        if (updatedAuthor) {
          return updatedAuthor
        }
        return null
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
  }
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      /* const currentUser = await User
        .findById(decodedToken.id) */
      return { currentUser }
    }

    const currentUser = await User.findOne({ username: "Myself" })
    return { currentUser }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})