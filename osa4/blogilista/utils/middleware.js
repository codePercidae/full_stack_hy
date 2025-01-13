const logger = require('./logger')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('-|-|-|-')
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')){
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const result = await User.findById(request.body.user)
  console.log('Pyyntö', request.body)
  request.user = result
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error)

  if (error.name === 'ValidationError'){
    return response.status(400).send({ error: 'Blog must have a title and a URL!' })
  } else if (error.name === 'CastError'){
    return response.status(400).send({ error: 'Invalid id!' })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')){
    return response.status(400).send({ error: 'Username already in use!' })
  } else if (error.message === 'password length'){
    return response.status(400).send({ error: 'password must be at least 4 characters long!' })
  } else if (error.message === 'username length'){
    return response.status(400).send({ error: 'username must be at least 4 characters long!' })
  } else if (error.name === 'JsonWebTokenError'){
    return response.status(401).send({ error: 'Invalid or missing token!' })
  } else if (error.name === 'TokenExpiredError'){
    return response.status(401).send({ error: 'Token expired!' })
  }
  next(error)
}

module.exports = {
  errorHandler, requestLogger, unknownEndpoint, tokenExtractor, userExtractor
}