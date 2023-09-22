import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR } from '../queries/editAuthor'

const BornForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')


  const [ editAuthor ] = useMutation(EDIT_AUTHOR)

  const submit = async (event) => {
    event.preventDefault()


    editAuthor({ variables: { name, setBornTo: parseInt(born) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>set birthyear</h2>

      <form onSubmit={submit}>
        <div>
            name <select value={name}
             onChange={({ target }) => 
             setName(target.value)}>
                <option value=''>select author</option>
                {authors.map((a) => (  
                    <option key={a.name} value={a.name}>{a.name}</option>
                ))}

             </select>
        </div>
        <div>
          birthyear <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update birthyear</button>
      </form>
    </div>
  )
}

export default BornForm