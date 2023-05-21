import { useState } from 'react'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { content: 'Arto Hellas', number: '1234567890' }
  ])  
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.content === newName)
    if (existingPerson) {
      alert(`${newName} is already in the phonebook!`)
    } else {
    const nameObject = {
      content: newName,
      number: newNum,
      id: persons.length + 1
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNum('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <div>
          <form onSubmit={addName}>
            <div>
              name:
               <input
              value={newName}
              onChange={handleNameChange}
              />
            </div>
            <div>
              number:
            <input
            value={newNum}
            onChange={handleNumChange}
            />
            </div>
          <button type="submit">add to phonebook</button>
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