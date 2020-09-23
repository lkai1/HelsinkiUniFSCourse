import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { createStore, combineReducers } from 'redux'

const reducer = combineReducers({
    anecdote : anecdoteReducer,
    notification: notificationReducer
})
const store = createStore(reducer)

export default store