const blogsRouter = require('express').Router()
const { Error } = require('mongoose')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, config.TOKENSECRET)
    if (!decodedToken.id){
      return response.status(401).json({ error: 'invalid token!' })
    }

    const blogToDelete = await Blog.findById(request.params.id)

    if (decodedToken.id.toString() === blogToDelete.user.toString()){
      await Blog.findByIdAndDelete(request.params.id)
      return response.status(204).end()
    } else {
      return response.status(401).json({ error: 'invalid user!' })
    }
  }
  catch(error) {next(error)}
})

blogsRouter.post('/', async (request, response, next) => {
  try{
    const body = request.body
    const decodedToken = jwt.verify(request.token, config.TOKENSECRET)

    if (!decodedToken.id){
      return response.status(401).json({ error: 'invalid token!' })
    }

    const user = request.user
    console.log(user)
    if(!user){
      return response.status(400).json({ error: 'User not found!' })
    }

    const blog = new Blog({
      id: body.id,
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user.id
    })

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