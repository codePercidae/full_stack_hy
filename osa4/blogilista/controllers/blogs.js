const blogsRouter = require('express').Router()
const { Error } = require('mongoose')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
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
  const blog = new Blog({
    id: body.id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
  try{
    const savedBlog = await blog.save()
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