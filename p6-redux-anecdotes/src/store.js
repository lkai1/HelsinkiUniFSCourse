import anecdoteReducer, { initializeAnecs } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import anecdoteService from './services/anecdotes'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    anecdote: anecdoteReducer,
    notification: notificationReducer
})
const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(thunk)))

export default store