const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}



const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://weeti:${password}@cluster0.sy0ktfh.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Note = mongoose.model('Note', noteSchema)
const note = new Note({
  name: name,
  number: number,
}) 

if (process.argv.length === 3) {
    Note.find({}).then(result => {
        result.forEach(note => {
          console.log(note)
        })
        mongoose.connection.close()
      })
} else {
    new Note({
        name: name,
        number: number,
      })

      note.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
      })
}



