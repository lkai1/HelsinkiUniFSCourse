import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import { BrowserRouter } from 'react-router-dom'
import PageRouter from './PageRouter'


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <PageRouter />
        </Provider>
    </BrowserRouter>, document.getElementById('root'))