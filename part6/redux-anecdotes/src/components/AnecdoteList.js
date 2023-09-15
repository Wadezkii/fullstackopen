import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick}) => {
    return ( 
        <div>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes} votes
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
const anecdotes = useSelector(state => state)
const dispatch = useDispatch()
const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <div>
        {sortedAnecdotes.map(anecdote => 
        <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => dispatch(vote(anecdote.id))}
        />
   )}
    </div>
  )

}

export default AnecdoteList