const Blog = require('../models/blog')
const User = require('../models/user')

const testBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    _v: 0,
    user: '6783f6cfe233e8ac0a8dcf3b'
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
    user: '6783f6cfe233e8ac0a8dcf3b'
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
    user: '6783f6cfe233e8ac0a8dcf3b'
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
    user: '6783f6cfe233e8ac0a8dcf3b'
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
    user: '6783f6cfe233e8ac0a8dcf3b'
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
    user: '6783f6cfe233e8ac0a8dcf3b'
  }
]

const newBlog = {
  id: '5a422bc61b54a676234d17fe',
  title: 'something about CS',
  author: 'someone related to CS',
  url: 'https://someCSsite.example',
  likes: 5
}

const newBlogWihtoutLikes = {
  id:'5a422bc61b54a676234d17fd',
  title: 'something about CS',
  author: 'someone related to CS',
  url: 'https://someCSsite.example'
}

const newBlogWithoutUrl = {
  title: 'something about CS',
  author: 'someone related to CS',
  likes: 9
}

const newBlogWihtoutTitle = {
  author: 'someone related to CS',
  url: 'https://someCSsite.example',
  likes: 7
}

const testUser = {
  _id: '6783f6cfe233e8ac0a8dcf3b',
  username: 'root',
  name: 'root',
  passwordHash: '$2b$10$2o/q0n4t2eBpwlfWV9vafu.jhAQj7Eyn59hJr9Jj/7.xXJOLFpd8a',
  //rootroot
  password: 'rootroot'
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const blogInDb = async (id) => {
  const blog = await Blog.findById(id)
  return blog.toJSON()
}

const usersInBd = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  testBlogs,
  newBlogWihtoutLikes,
  newBlog,
  newBlogWithoutUrl,
  newBlogWihtoutTitle,
  blogsInDb,
  blogInDb,
  usersInBd,
  testUser
}