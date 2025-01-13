const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const express = require('express')
const app = express()

const cors = require('cors')

const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('connected'))
  .catch((error) => logger.error(error))


app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', middleware.userExtractor,blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app