import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'

const reducer = combineReducers({
    notification: notificationReducer,
    blog: blogReducer,
    user: userReducer
})
const store = createStore(reducer)

export default store