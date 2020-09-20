const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogposts')

  response.json(users.map(user => user.toJSON()))
})
usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (body.password === undefined) {
    return response.status(405).json({
      error: 'invalid password'
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash
  })
  user.blogs = []
  const username = await User.find({}).then(users => {
    return users.find(e => e.username === user.username)
  })
  if (username !== undefined) {
    return response.status(405).json({
      error: 'username already exists'
    })
  }
  if (user.username === undefined || user.username.length < 3) {
    return response.status(400).json({
      error: 'username has to be at least 3 characters long'
    })
  }
  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter