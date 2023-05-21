import { useState } from 'react'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { content: 'Arto Hellas' }
  ])  
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.content === newName)
    if (existingPerson) {
      alert(`${newName} is already in the phonebook!`)
    } else {
    const nameObject = {
      content: newName,
      id: persons.length + 1
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <div>
          <form onSubmit={addName}>
            <input
            value={newName}
            onChange={handleNameChange}
            />
          <button type="submit">add name</button>
          </form>
        </div>
      </div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(persons =>
          <Persons key={persons.content} persons={persons}/>
          )}
      </ul>
    </div>
  )

}

export default App