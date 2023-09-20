import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import blogService from '../services/blogs'

const BlogDetails =() => {
const { id } = useParams()
const [blog, setBlog] = useState(null)
const [comment, setComment] = useState('')

const addComment = async () => {
    try {
        const updatedBlog = { ...blog, comments: blog.comments.concat(comment) }
        const updatedFromServer = await blogService.addComment(blog.id, updatedBlog)
        setBlog(updatedFromServer)
        setComment('')
    } catch (error) {
        console.log('error adding comment', error)
    }
}

useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const fetchedBlog = await blogService.getById(id)
        setBlog(fetchedBlog)
      } catch (error) {
        console.error('Failed to fetch blog details:', error)
      }
    }

    fetchBlogDetails()
  }, [id])


  if (!blog) {
    return null
  }

  return (
    <div>
    <h2>{blog.title}</h2>
     <div>{blog.url}</div>
     <div>{blog.likes} likes <button>like</button></div>
     <div>added by: {blog.author}</div>

     <div>
         <h3>comments</h3>
            <ul>
            {blog.comments && blog.comments.map((c, index) => <li key={index}>{c}</li>)}
            </ul>
            <input 
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            />
            <button onClick={addComment}>comment</button>
     </div>
    </div>
    
  )
}

export default BlogDetails
