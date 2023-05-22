import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { content: 'Arto Hellas', number: '1234567890' },
    { content: 'Matti Meikäläinen', number: '222222'},
    { content: 'Sanna Suomalainen', number: '555555'}
  ])  

  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const addName = (newName, newNum) => {
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
    setPersons(updatedPersons)
    setFilteredPersons(updatedPersons)

    if (filter) {
      const filtered = updatedPersons.filter(person => person.content.toLowerCase().includes(filter.toLowerCase()))
      setFilteredPersons(filtered)    
    } else {
      setFilteredPersons(updatedPersons)
    }
    }
  }


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const filterPersons = () => {
    const filtered = persons.filter((person) =>
      person.content.toLowerCase().includes(filter.toLowerCase())
    )
    setFilteredPersons(filtered)

  }
  const resetFilter = () => {
    setFilter('')
    setFilteredPersons(persons)
  }

  
  

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
        filterPersons={filterPersons}
        resetFilter={resetFilter}
      />
      <div>
        <div>
          <h2>add new entry</h2>
          <PersonForm addName={addName} />
        </div>
      </div>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <Persons key={person.content} persons={person} />
      ))}
    </div>
  )

}

export default App