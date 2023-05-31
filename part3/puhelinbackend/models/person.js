require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = 'mongodb+srv://weeti:veQ6zBIMr7wI0WLR@cluster0.sy0ktfh.mongodb.net/?retryWrites=true&w=majority'

console.log('connecting to', url)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required:true,
  },
  number: {
    type: String,
    validate: {
      validator: function (value) {
        const numCheck = /^\d{2,3}-\d{7,}$/
        return numCheck.test(value)
      },
      message: 'Invalid format'
    },
    required: true,
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)

