import { gql, useQuery } from '@apollo/client'
import BornForm from './BornForm'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
  `


const Authors = (props) => {
  const {loading, data} = useQuery(ALL_AUTHORS, {
    pollInterval: 1000
  })

  if (loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }
  const authors = data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BornForm authors={authors}/>
    </div>
  )
}

export default Authors
