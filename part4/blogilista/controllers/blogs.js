const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {
      username: 1,
      name: 1
    })

  response.json(blogs)
})

blogsRouter.delete('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id){
    return response.status(401).json({ error: 'invalid token' })
  }
  if (blog.user.toString() !== decodedToken.id) {
    return response.status(403).json({error: 'only the original poster can delete this post' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


blogsRouter.get('/:id', async (request,response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(201).json(blog)
  }
})

blogsRouter.put('/:id', async ( request, response ) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    {new: true})

    response.json(updatedBlog) 
})

/*
const getTokenFrom = request => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}
*/

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({error: 'token invalid'})
  }
  const user = await User.findById(decodedToken.id)
  if (!user) {
    user = await User.findOne({})
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if (!body.title || !body.url ) {
    return response.status(400).json("400 Bad request")
  }

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
})

blogsRouter.post('/api/blogs/:id/comments', async (request, response) => {
  const blogId = request.params.id
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  const comment = request.body.comment
  if (!comment) {
    return response.status(404).json({ error: 'comment not found' })
  }

  if (!blog.comments) {
    blog.comments = []
  }

  blog.comments.push(comment)
  await blog.save()

  res.json(blog)
})



module.exports = blogsRouter