import React, {useState} from 'react'

const PersonForm = ({ addName }) => {
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
      }
      const handleNumChange = (event) => {
        setNewNum(event.target.value)
      }

      const handleSubmit = (event) => {
        event.preventDefault()
        addName(newName, newNum)
        setNewName('')
        setNewNum('')
      }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div>
                    name:
                    <input name="name" value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number:
                    <input name="number" value={newNum} onChange={handleNumChange} />
                </div>
                <button type="submit">add to phonebook</button>
            </form>
        </div>
    )
}

export default PersonForm