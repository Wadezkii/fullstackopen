import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])  
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  useEffect (() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
      }, [])
  

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
    
    axios
      .post('http://localhost:3001/persons', nameObject)
      .then((response) => {
        console.log(response.data)
        setPersons([...persons, response.data])
        setFilteredPersons([...persons, response.data])
      })
      .catch((error) => {
        console.log('error')
      })
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