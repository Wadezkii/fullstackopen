import React, { useState } from 'react'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'

const Blog = ({ blog: initialBlog, loggedInUser }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [blog, setBlog] = useState(initialBlog)


  const  handleLike= async () => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
      const updatedFromServer = await blogService.likeBlog(blog.id, updatedBlog)
      updatedFromServer.user = blog.user
      setBlog(updatedFromServer)
    } catch (error) {
      console.log('error liking blog', error)
    }
  }

  const handleDelete = async () => {
    if(window.confirm(`Do you want to delete ${blog.title} by ${blog.author}?`))
      try {
        await blogService.deleteBlog(blog.id)
      } catch (error) {
        console.log('error deleting blog', error)
      }
  }

  return (
    <div>
      <div>
      <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author} </Link> 
      </div>
      </div>
  )
}

export default Blog