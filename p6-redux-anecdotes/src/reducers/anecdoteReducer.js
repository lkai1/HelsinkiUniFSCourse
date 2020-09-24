import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(e => e.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(e =>
        action.data.id !== e.id ? e : votedAnecdote
      )
    case 'CREATE':
      return state.concat(action.data)
    case 'INIT_ANEC':
      return action.data
    default: return state
  }
}

export const createVote = id => {
  return async dispatch => {
    const vote = await anecdoteService.vote(id)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}
export const initializeAnecs = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANEC',
      data: anecdotes
    })
  }
}

export default anecdoteReducer