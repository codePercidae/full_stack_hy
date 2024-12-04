const lodash = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const res = blogs.length === 0 ? 0 : blogs.reduce((p,t) => p+t.likes, 0)
  return res
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0){
    return null
  }
  var max = 0
  var ret = {}
  blogs.forEach(blog => {
    if (blog.likes > max) {
      ret = blog
      max = blog.likes
    }
  })
  return {
    title: ret.title,
    author: ret.author,
    likes: ret.likes
  }
}

const mostBlogs = (blogs) => {
  const blogsByAuthor = lodash.groupBy(blogs, 'author')
  const sorted = lodash.sortBy(blogsByAuthor, 'length')
  const fav = sorted.pop()
  return {
    author: fav[0].author,
    blogs: fav.length
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0){
    return null
  }
  const blogsByAuthor = lodash.groupBy(blogs, 'author')
  var mostLiked = ''
  var maxLikes = 0
  for (const [key, item] of Object.entries(blogsByAuthor)) {
    var currentLikes = 0
    item.forEach(b => {
      currentLikes += b.likes
    })
    if (currentLikes > maxLikes) {
      mostLiked = key
      maxLikes = currentLikes
    }
  }
  return {
    author: mostLiked,
    likes: maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}