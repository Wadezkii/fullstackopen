import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

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
     const updatedBlog = {...blog, likes: blog.likes + 1, user: blog.user.id}
     await blogService.likeBlog(blog.id, updatedBlog)
  } catch (error) {

  }
}

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
    </div>
  )
}

export default Blog