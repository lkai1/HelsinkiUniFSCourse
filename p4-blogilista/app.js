const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoUrl = config.MONGODB_URI

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })
app.use(express.static('build'))
app.use(middleware.errorHandler)
app.use(middleware.requestLogger)
app.use(cors())
app.use(express.json())
app.use('/api/blogposts', blogsRouter)

module.exports = app