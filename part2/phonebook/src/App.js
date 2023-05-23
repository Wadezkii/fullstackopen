import { useState, useEffect } from 'react'
import { getAllPersons, createPerson, deletePerson, updatePerson} from './services/persons'
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
    getAllPersons()
      .then((data) => {
        console.log('promise fulfilled')
        setPersons(data)
        setFilteredPersons(data)
      })
      }, [])
  

  const addName = (newName, newNum) => {
    const existingPerson = persons.find(person => person.content === newName)
    if (existingPerson) {
      const confirmReplace = window.confirm(`${newName} is already in the phonebook! Would you like to replace the existing number with the new number?`)

      if (confirmReplace) {
        const updatedPerson = {...existingPerson, number: newNum}
        const updatedPersons = persons.map(person => person.id === existingPerson.id ? updatedPerson : person)

        updatePerson(existingPerson.id, updatePerson)
        .then(data => {
          setPersons(updatedPersons)
          setFilteredPersons(updatedPersons)
        })
      }
    } else {
      createPerson(newName, newNum)
      .then((data) => {
        console.log(data)
        setPersons([...persons, data])
        setFilteredPersons([...persons, data])
      })
      .catch((error) => {
        console.log('error', error)
      })
    
    }
  }

  const handleDeletePerson = (id) => {
    deletePerson(id)
      .then(() => {
        const updatedPersons = persons.filter((person) => person.id !== id)
        setPersons(updatedPersons)
        setFilteredPersons(updatedPersons)
      })
      .catch((error) => {
        console.log('error', error)
      })
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
        <Persons key={person.content} persons={person} handleDeletePerson={handleDeletePerson} />
      ))}
    </div>
  )

}

export default App