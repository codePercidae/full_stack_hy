const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  res = blogs.length === 0 ? 0 : blogs.reduce((p,t) => p+t.likes, 0)
  return res
}


module.exports = {
  dummy,
  totalLikes
}