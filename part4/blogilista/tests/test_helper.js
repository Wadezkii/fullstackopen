const Blog = require('../models/blog')

const initialBlogs = [
    {
      title: "blog1",
      author: "someone",
      url: "no url",
      likes: 12
    },
    {
      title: "blog2",
      author: "me:)",
      url: "www.youtube.com",
      likes: 69
    },
  ]
  
  const nonExistingLikes = async () => {
    const blog = new Blog ({ 
      title: "asdf",
      author: "asdf",
      url: "url",
    })
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
  }
  
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

module.exports = {
    initialBlogs,
    nonExistingLikes,
    blogsInDb
}