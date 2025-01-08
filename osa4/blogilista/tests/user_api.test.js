const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const mongoose = require('mongoose')
const User = require('../models/user')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('NotGooodPasaword', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('POST', () => {
  test('adding new unique user works', async () => {
    const usersInBeginning = await helper.usersInBd()

    const newUser = {
      username: 'uusiKayttaja',
      name: 'kayttaja1',
      password: 'salainenSalasana'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersInEnd = await helper.usersInBd()

    assert.strictEqual(usersInEnd.length, usersInBeginning.length + 1)
  })

  test('adding user with too short name results to error', async () => {
    const faultyUser = {
      username: 'buu',
      name: 'somename',
      password: 'l0ngP4ssword'
    }

    const res = await api.post('/api/users')
      .send(faultyUser)
      .expect(400)

    const err = res.body
    assert.deepStrictEqual(err, { error: 'username must be at least 4 characters long!' })
  })

  test('adding user with too short password results to error', async () => {
    const faultyUser = {
      username: 'babuubabu',
      name: 'somename',
      password: '123'
    }

    const res = await api.post('/api/users')
      .send(faultyUser)
      .expect(400)

    const err = res.body
    assert.deepStrictEqual(err, { error: 'password must be at least 4 characters long!' })
  })

  test('adding user with already existing username results to error', async () => {
    const duplicateUser = {
      username: 'root',
      name: 'kayttaja',
      password: '1308y2hf98'
    }

    await api.post('/api/users')
      .send(duplicateUser)
      .expect(400)
  })
})

describe('GET', () => {
  test('get returns users as JSON', async () => {
    await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('get returns correct amount of users', async () => {
    const response = await api.get('/api/users')
    assert.strictEqual(response.body.length, 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})
