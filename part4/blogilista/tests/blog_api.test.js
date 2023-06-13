const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('identifying field is id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  for (const blog of blogs) {
  expect(blog.id).toBeDefined()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)

  expect(contents).toContain(
    "blog2"
  )
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: "tester",
    url: 'make believe',
    likes: '0'
  }
  const initialBlogs = await helper.blogsInDb()

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

  const contents = blogsAtEnd.map(r => r.title)
  expect(contents).toContain(
    'async/await simplifies making async calls'
  )
})

test('a blog without "likes" gets value of 1', async () => {
  const newBlog = {
    title: "",
    author: "",
    url: "",
  }

const response = await api
.post('/api/blogs')
.send(newBlog)
.expect(201)

expect(response.body.likes).toBe(1)
})

test('updating blog works', async () => {
  const initialBlog = await helper.blogsInDb()
  const blogToEdit = initialBlog[0]
  
  const updatedBlog = {
    ...blogToEdit,
    likes: 25
  }
  const response = await api
  .put(`/api/blogs/${blogToEdit.id}`)
  .send(updatedBlog)

  expect(response.status).toBe(200)
  expect(response.body.likes).toBe(25)
})

test('blog can be deleted' ,async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
  .delete(`/api/blogs/${blogToDelete.id}`)
  .expect(204)
})

test('400 if no title or url', async () => {
  const newBlog = {
    author: "",
    likes: 3
  }
  try {
    await api
      .post('/api/blogs')
      .send(newBlog);
  } catch (error) {
    expect(error.response.status).toBe(400);
  }
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api
  .get(`/api/blogs/${blogToView.id}`)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  expect(resultBlog.body).toEqual(blogToView)
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'wadsu',
      name: 'wadekiller',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})