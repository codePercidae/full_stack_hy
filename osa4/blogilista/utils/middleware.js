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
  }
  next(error)
}

module.exports = {
  errorHandler, requestLogger, unknownEndpoint
}