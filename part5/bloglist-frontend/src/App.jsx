import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null})
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(fetchedBlogs => {
      const sortedBlogs = fetchedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
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
    setBlogFormVisible(false)
    setTimeout(() => {
      setNotification({message: null, type: null})
    }, 5000)
    
    
  } catch (exception) {
    console.error('Error adding blog', exception)
  }
}

const hideWhenBlogFormVisible = { display: blogFormVisible ? 'none' : '' }
const showWhenBlogFormVisible = { display: blogFormVisible ? '' : 'none' }

  if (user === null) {
    const hideWhenVisible = { display: loginVisible ? 'none' : ''}
    const showWhenVisible = { display: loginVisible ? '' : 'none'}

    return (
      <div>
        {notification.message && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
        <h2 style={hideWhenVisible}>Welcome to bloghaven</h2>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in </button>
        </div>
        <div style={showWhenVisible}>
        <LoginForm 
        handleLogin={handleLogin} 
        username={username} 
        setUsername={setUsername} 
        password={password} 
        setPassword={setPassword} 
      />
      <button onClick={() => setLoginVisible(false)}>cancel login</button>
      </div>
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
        <div style={hideWhenBlogFormVisible}>
          <button onClick={() => setBlogFormVisible(true)}>Create new blog</button>
        </div>
        <div style={showWhenBlogFormVisible}>
      <BlogForm 
        addBlog={addBlog}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
      />
      <button onClick={() => setBlogFormVisible(false)}>Cancel</button>
      </div>
      </div>
    </div>
  )
}

export default App