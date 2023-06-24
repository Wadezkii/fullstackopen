const _ = require('lodash')
const dummy = (blogs) => {
    return 1
  }

  function totalLikes(blogs) {
    const total = blogs.reduce((sum, item) => {
      return sum + item.likes;
    }, 0);
  
    return total;
  }

function favoriteBlog(blogs) {
    const mostLiked = blogs.reduce((maxBlog, currentBlog) => {
        return currentBlog.likes > maxBlog.likes ? currentBlog : maxBlog
    })
    return mostLiked
}

const mostBlogs = (blogs) => {
  const blogCounts = _.countBy(blogs, 'author')
  const maxAuthor = _.maxBy(_.keys(blogCounts), (author) => blogCounts[author])
  const maxCount = blogCounts[maxAuthor]

  return {
    author: maxAuthor,
    blogs: maxCount
  }
}

const mostLikes = (blogs) => {
  const likesByAuthor = _.groupBy(blogs, 'author')
  const authorLikes = _.mapValues(likesByAuthor, (blogs) =>
    _.sumBy(blogs, 'likes')
  )
  const maxAuthor = _.maxBy(_.keys(authorLikes), (author) => authorLikes[author])
  const maxLikes = authorLikes[maxAuthor]

  return {
    author: maxAuthor,
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