import { useState } from 'react'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { content: 'Arto Hellas', number: '1234567890' },
    { content: 'Matti Meikäläinen', number: '222222'},
    { content: 'Sanna Suomalainen', number: '555555'}
  ])  
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

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
    const updatedPersons = persons.concat(nameObject)
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNum('')

    if (filter) {
      const filtered = updatedPersons.filter(person => person.content.toLowerCase().includes(filter.toLowerCase()))
      setFilteredPersons(filtered)    
    } else {
      setFilteredPersons(updatedPersons)
    }
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const filterPersons = () => {
    const filtered = persons.filter(person => person.content.toLowerCase().includes(filter.toLowerCase()))
    setFilteredPersons(filtered)
  }
  const resetFilter = () => {
    setFilter('')
    setFilteredPersons(persons)
  }
  
  

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <div>
          <form onSubmit={(event) => event.preventDefault()}>
            <input value={filter} onChange={handleFilterChange} />
            <button onClick={filterPersons}>filter</button>
            <button onClick={resetFilter}>reset filter</button>
          </form>
        </div>
        <div>
          <h2>add new entry</h2>
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
        {filteredPersons.map(persons =>
          <Persons key={persons.content} persons={persons}/>
          )}
      </ul>
    </div>
  )

}

export default App