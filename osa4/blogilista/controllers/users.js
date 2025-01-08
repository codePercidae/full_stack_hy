const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body
  try {
    if (password.length < 4){
      throw Error('password must be at least 4 characters long!')
    }
    if (username.length < 4){
      throw Error('username must be at least 4 characters long!')
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = usersRouter