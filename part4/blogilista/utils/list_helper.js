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

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }