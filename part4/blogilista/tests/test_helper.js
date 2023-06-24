const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: "blog1",
      author: "someone",
      url: "no url",
      likes: 12
    },
    {
      title: "blog2",
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

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
module.exports = {
    initialBlogs,
    nonExistingLikes,
    blogsInDb,
    usersInDb
}