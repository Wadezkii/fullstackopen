import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog: initialBlog, loggedInUser }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [blog, setBlog] = useState(initialBlog)

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  if (!detailsVisible) {
    return (
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>view</button>
      </div>
    )
  }

  const handleLike = async () => {
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

  console.log(typeof loggedInUser.id, loggedInUser.id)
  console.log(typeof blog.user.id, blog.user.id)
  console.log(loggedInUser)
  return (
    <div>
      <div>
        {blog.title} {blog.author} <button onClick={toggleDetails}>hide</button>
      </div>
      <div>
        URL: {blog.url}
      </div>
      <div>
        Likes: {blog.likes} <button onClick={handleLike}>like</button>
      </div>
      <div>
        Added by: {blog.user.name}
      </div>
      {loggedInUser && loggedInUser.name === blog.user.name && (
        <button onClick={handleDelete}>delete</button>
      )}
    </div>
  )
}

export default Blog