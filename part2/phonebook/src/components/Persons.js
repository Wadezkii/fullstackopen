import { useState } from "react"

const Persons = ({ persons, handleDeletePerson }) => {
    const confirmDelete = () => {
        const result = window.confirm(`Are you sure you want to delete ${persons.content}?`)
        if (result) {
            handleDeletePerson(persons.id)
        }
    }

    return (
        <div>
        <p>
        {persons.content} - {persons.number}
        <button onClick={confirmDelete}>delete</button>
        </p>
        </div>
    )
}

export default Persons