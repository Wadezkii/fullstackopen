import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification({message: 'successful login', type: 'success'})
      setTimeout(() => {
        setNotification({message: null, type: null})
      }, 5000)
    } catch (exception) {
      setNotification({message: 'wrong credentials', type: 'error'})
      setTimeout(() => {
        setNotification({message: null, type: null})
      }, 5000)
    }
  }
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setNotification({message: 'logged out', type: 'success'})
      setTimeout(() => {
        setNotification({message: null, type: null})
      }, 5000)
  }
  
  const addBlog = async (event) => {
    event.preventDefault()
  
  try {
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    await blogService.create(newBlog)
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)

    const response = await blogService.create(newBlog)
    console.log(response)

    setBlogs(updatedBlogs)
    setTitle('')
    setAuthor('')
    setUrl('')
    setNotification({message: `A new blog ${title} by ${author} added successfully`, type: 'success'})
    setTimeout(() => {
      setNotification({message: null, type: null})
    }, 5000)
  } catch (exception) {
    console.error('Error adding blog', exception)
  }
}

  if (user === null) {
    return (
      <div>
        {notification.message && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      </div>
    )
  }

  return (
    <div>
      <div>
        {notification.message && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
      </div>
      <p>{user.name} logged in <button onClick={handleLogout} type='submit'>logout</button></p> 
      <h2>blogs</h2>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <div>
        <h2>create a new blog</h2>
        <form onSubmit={addBlog}>
          <div>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            Author
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            URL
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    </div>
  )
}

export default App