const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('-|-|-|-')
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
    return response.status(400).send({ error: 'Invalid id' })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')){
    return response.status(400).send({ error: 'Username already in use!' })
  } else if (error.message === 'password must be at least 4 characters long!'){
    return response.status(400).send({ error: 'password must be at least 4 characters long!' })
  } else if (error.message === 'username must be at least 4 characters long!'){
    return response.status(400).send({ error: 'username must be at least 4 characters long!' })
  }
  next(error)
}

module.exports = {
  errorHandler, requestLogger, unknownEndpoint
}