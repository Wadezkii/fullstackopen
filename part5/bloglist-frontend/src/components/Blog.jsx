import React, { useState } from 'react'
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

  return (
    <div>
      <div>
        {blog.title} {blog.author} <button onClick={toggleDetails}>hide</button>
      </div>
      <div>
        URL: {blog.url}
      </div>
      <div>
        Likes: {blog.likes} <button>like</button>
      </div>
      <div>
        Added by: {blog.user.name}
      </div>
    </div>
  )
}

export default Blog