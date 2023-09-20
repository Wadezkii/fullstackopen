import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
         {users.map(user => (
       <tr key={user.username}>
         <td>
        <Link to={`/users/${user.id}`}>
          {user.name}
        </Link>
      </td>
      <td>{user.blogCount}</td>
       </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users