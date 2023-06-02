const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.delete('/:id', async (request, response) => {
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

blogsRouter.post('/', async (request, response) => {
  const {title, url} = request.body

  if (!title || !url ) {
    return response.status(400).json("400 Bad request")
  }
  const blog = new Blog(request.body)

    const savedBlog = await blog.save()
    response.json(savedBlog)
})



module.exports = blogsRouter