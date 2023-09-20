import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notifReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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
const anecdotes = useSelector(state => state.anecdotes.anecdotes)
const dispatch = useDispatch()

const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
}

const filter = useSelector(state => state.filter)
const filteredAnecdotes = anecdotes.filter(anecdote =>
     anecdote.content.toLowerCase().includes(filter.toLowerCase()))
const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)

return (
    <div>
        {sortedAnecdotes.map(anecdote => 
        <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => handleVote(anecdote)}
        />
   )}
    </div>
  )

}

export default AnecdoteList