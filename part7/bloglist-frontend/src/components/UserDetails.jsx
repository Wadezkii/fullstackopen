import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import userService from '../services/users'

const UserDetails = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  

  useEffect(() => {
    userService.getById(id).then(fetchedUser => {
      setUser(fetchedUser)
      console.log(fetchedUser)
    })
  }, [id])

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
    </div>
  )
}

export default UserDetails
