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

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE':
      const id = action.payload.id
      const anecdoteToChange = state.anecdotes.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return {
        ...state,
        anecdotes: state.anecdotes.map(anecdote => 
          anecdote.id !== id ? anecdote : changedAnecdote)
      }
    case 'ADD':
      const anecdote = action.payload.content
      return {
        ...state,
        anecdotes: [...state.anecdotes, asObject(anecdote)]
      }

    case 'SET_FILTER':
      return {...state, filter: action.payload.filter}

    default:
      return state
  }
  
}

export const createAnecdote = (content) => { return {
  type: 'ADD',
  payload: {content}
}}

export const vote = (id) => {
  console.log('vote', id)
  return{
    type: 'VOTE',
    payload: { id }
  }
}

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: { filter }
  }
}


export default reducer