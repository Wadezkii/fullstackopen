const mongoose = require('mongoose')

  const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: {
      type: Number,
      default: 1
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    comments: [String]
  })

  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject.__v
      delete returnedObject._id
    }
  })
  
  module.exports = mongoose.model('Blog', blogSchema)