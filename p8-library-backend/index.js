const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book');
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET
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
      authorCount: Int!
      bookCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
    }
  `

const resolvers = {
  Query: {
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
  Mutation: {
    addBook: async (root, args) => {
      const matchingAuthor = await Author.findOne({ name: args.author })

      if (matchingAuthor) {
        const book = new Book({
          title: args.title,
          published: args.published,
          author: matchingAuthor,
          genress: args.genres
        })

        try {
          await book.save()
        } catch (error) {
          console.log('ERROR: ', error.message)
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
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
          genress: args.genres
        })
        try {
          await book.save()
        } catch (error) {
          console.log('ERROR: ', error.message)
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return book
      }
    },
    editAuthor: async (root, args) => {
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
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})