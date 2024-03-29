import { useState, useEffect } from 'react'
import { getAllPersons, createPerson, deletePerson, updatePerson} from './services/persons'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import './index.css'
import {DeletedNotif, AddedNotif} from './components/DeletedNotif'

const App = () => {
  const [persons, setPersons] = useState([])  
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [errorMessage, setErrorMessage] = useState(null)
  const [addedMessage, setAddedMessage] = useState(null)

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
    if (newName.length < 3 ) {
      setErrorMessage('Name must be at least 3 characters long')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
      return
    }

    const existingPerson = persons.find((person) => person.name === newName)
    if (existingPerson) {
      const confirmReplace = window.confirm(`${newName} is already in the phonebook! Would you like to replace the existing number with the new number?`)

      if (confirmReplace) {
        updatePerson(existingPerson.id, {number : newNum })
        .then(updatedPerson => {
          const updatedPersons = persons.map(person => 
            person.id === existingPerson.id ? updatedPerson : person)

          setPersons(updatedPersons)
          setFilteredPersons(updatedPersons)
          setAddedMessage(
            `${updatedPerson.name} was updated in the phonebook`
          )
          setTimeout(() => {
            setAddedMessage(null)
          }, 5000);
        })
      }
    } else {
      createPerson(newName, newNum)
      .then((data) => {
        console.log(data)
        setPersons([...persons, data])
        setFilteredPersons([...persons, data])
        setAddedMessage(
          `${newName} was added to the phonebook`
        )
        setTimeout(() => {
          setAddedMessage(null)
        }, 5000);
      })
      .catch((error) => {
        console.log(error.response.data)
        setErrorMessage('Error adding name to the phonebook')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      })
    
    }
  }

  const handleDeletePerson = (id) => {
    const deletedPerson = persons.find((person) => person.id === id)
    deletePerson(id)
      .then(() => {
        const updatedPersons = persons.filter((person) => person.id !== id)
        setPersons(updatedPersons)
        setFilteredPersons(updatedPersons)
        setErrorMessage(
          `${deletedPerson.name} was deleted from the phonebook`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setErrorMessage(
          `${deletedPerson.name} has already been deleted from the phonebook`
      )
        } else {
          setErrorMessage(
            `Error deleting ${deletedPerson.name} from the phonebook`
          )
        }
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        const updatedPersons = persons.filter((person) => person.id !== id)
        setPersons(updatedPersons)
        setFilteredPersons(updatedPersons)
      })
  }


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const filterPersons = () => {
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
    setFilteredPersons(filtered)

  }
  const resetFilter = () => {
    setFilter('')
    setFilteredPersons(persons)
  }

  return (
    <div>
      <AddedNotif message={addedMessage}/>
      <DeletedNotif message={errorMessage}/>
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
        <Persons key={person.id} persons={person} handleDeletePerson={handleDeletePerson} />
      ))}
    </div>
  )

}

export default App