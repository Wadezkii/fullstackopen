import { createSlice } from '@reduxjs/toolkit'
import {setNotification as setNotif, clearNotification } from './notifReducer'
import anecdoteService from '../services/anecdotes'


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
    appendAnecdote: (state, action) => {
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
  return async (dispatch, getState) => {
    const votedAnecdote = getState().anecdotes.anecdotes.find(n => n.id === id)
    const updatedAnecdote = { ...votedAnecdote, votes: votedAnecdote.votes + 1 }
    const saveAnecdote = await anecdoteService.likeAnecdote(updatedAnecdote)
    dispatch(vote(saveAnecdote.id))

    dispatch(setNotification(`you voted '${votedAnecdote.content}'`, 5))

  }
}



export const { vote, setFilter, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))

    dispatch(setNotification(`added '${newAnecdote.content}'`, 5))
  }
}

export const setNotification = (content, duration) => {
  return async dispatch => {
    dispatch(setNotif(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)
  }
}

export default anecdoteSlice.reducer