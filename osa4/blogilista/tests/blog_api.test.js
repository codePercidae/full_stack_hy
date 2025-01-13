const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('./../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const user = new User(helper.testUser)
  user.save()
  await Blog.deleteMany({})
  let initialBlogs = helper.testBlogs.map(b => new Blog(b))
  await Blog.insertMany(initialBlogs)
})

describe('Blog GET', () => {
  test('GET returns blogs as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect('Content-Type', /application\/json/)
  })

  test('GET returns correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 6)
  })
})

test('blogs are identified by id', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body[0].id, '5a422a851b54a676234d17f7')
})

describe('Blog POST', async () => {

  test('posting without authorization results to 401', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ')
      .send(helper.newBlog)
      .expect(401)
  })

  test('amount of blogs grows by one', async () => {
    const res = await api.post('/api/login').send(helper.testUser)
    const token = res.body.token
    const newBlog = helper.newBlog
    newBlog.user = res.body.id

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(201)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.testBlogs.length + 1)
  })

  test('if added blog has no likes, make it 0 automatically', async () => {
    const res = await api.post('/api/login').send(helper.testUser)
    const token = res.body.token
    const newBlog = helper.newBlogWihtoutLikes
    newBlog.user = res.body.id

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(201)

    const response = await api.get('/api/blogs')
    const addedBlog = response.body.find(b => b.title === 'something about CS')
    assert.strictEqual(addedBlog.likes, 0)
  })

  test('if added blog has no url or title, throw exception', async () => {
    const res = await api.post('/api/login').send(helper.testUser)
    const token = res.body.token
    const newBlog1 = helper.newBlogWithoutUrl
    newBlog1.user = res.body.id
    const newBlog2 = helper.newBlogWihtoutTitle
    newBlog2.user = res.body.id

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog1)
      .expect(400)

    await api
      .post('/api/blogs')
      .set('authorization', 'Bearer ' + token)
      .send(newBlog2)
      .expect(400)
  })
})

describe('Blog DELETE', () => {

  test('delete removes blog from DB', async () => {
    const res = await api.post('/api/login').send(helper.testUser)
    const token = res.body.token
    const blogsInStart = await helper.blogsInDb()
    const blogToDelete = blogsInStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(204)

    const blogsInEnd = await helper.blogsInDb()
    assert.strictEqual(blogsInEnd.length, helper.testBlogs.length - 1)
  })

  test('delete throws error if ID does not exsist', async () => {
    const res = await api.post('/api/login').send(helper.testUser)
    const token = res.body.token
    await api
      .delete('/api/blogs/1')
      .set('Authorization', 'Bearer ' + token)
      .expect(400)
  })
})

describe('Blog UPDATE', () => {

  test('updates element successfully', async () => {
    const res = await api.post('/api/login').send(helper.testUser)
    const token = res.body.token

    const updatedBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 15,
    }

    await api
      .post('/api/blogs/5a422a851b54a676234d17f7')
      .set('Authorization', 'Bearer ' + token)
      .send(updatedBlog)
      .expect(200)

    updatedBlog.id = '5a422a851b54a676234d17f7'
    const blogInDb = await helper.blogInDb('5a422a851b54a676234d17f7')
    assert.strictEqual(blogInDb.likes, updatedBlog.likes)
  })

  test('update to non-existing id causes exception', async () => {
    const updatedBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 15,
    }

    await api
      .post('/api/blogs/5a422a851b54a676234d17b2')
      .send(updatedBlog)
      .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})