import { createSlice } from '@reduxjs/toolkit'
import { setNotification, clearNotification } from './notifReducer'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState =  {
  anecdotes: anecdotesAtStart.map(asObject),
  filter: '',
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote: (state, action) => {
      const id = action.payload
      const anecdoteToChange = state.anecdotes.find(n => n.id === id)
      anecdoteToChange.votes += 1

    },
    createAnecdote: (state, action) => {
      state.anecdotes.push(asObject(action.payload))
    },
    setFilter: (state, action) => {
      state.filter = action.payload.filter
    }
  }
})

export const voteAnecdote = (id) => {
  return (dispatch, getState) => {
    dispatch(vote(id))
    const votedAnecdote = getState().anecdotes.anecdotes.find(n => n.id === id)
    dispatch(setNotification(`you voted '${votedAnecdote.content}'`))

    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export const addAnecdote = (content) => {
  return (dispatch) => {
    const newAnecdote = asObject(content)
    dispatch(createAnecdote(newAnecdote.content))

    dispatch(setNotification(`added '${newAnecdote.content}'`))

    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export const { vote, createAnecdote, setFilter } = anecdoteSlice.actions
export default anecdoteSlice.reducer