const blogsRouter = require('express').Router()
const { Error } = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
  catch(error) {next(error)}
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

  if (!decodedToken.id){
    return response.status(401).json({ error: 'invalid token!' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    id: body.id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  try{
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
  catch(error){
    next(error)
  }
})

blogsRouter.post('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  try{
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    if (updatedBlog){
      response.status(200).json(updatedBlog)
    }
    else {
      throw Error.CastError
    }
  }
  catch(error){
    next(error)
  }
})

module.exports = blogsRouter