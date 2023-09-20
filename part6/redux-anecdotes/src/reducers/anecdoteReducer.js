import { createSlice } from '@reduxjs/toolkit'
import { setNotification, clearNotification } from './notifReducer'


const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState =  {
  anecdotes: [],
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
      state.anecdotes.push(action.payload)
    },
    setFilter: (state, action) => {
      state.filter = action.payload.filter
    },
    setAnecdotes(state, action) {
      state.anecdotes = action.payload
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

export const { vote, createAnecdote, setFilter, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer