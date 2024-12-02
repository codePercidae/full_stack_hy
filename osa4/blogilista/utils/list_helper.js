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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}