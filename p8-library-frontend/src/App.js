
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Recommended from './components/Recommended'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm.js'
import { useApolloClient } from '@apollo/client';
const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState('')
  const [loggedin, setLoggedIn] = useState(false)
  const client = useApolloClient()

  const Logout = () => {
    if (loggedin || token) {
      setToken(null)
      localStorage.clear()
      client.resetStore()
      return (
        <span>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setLoggedIn(false)}>Logout</button>
        </span>
      )
    } else {
      return (<button onClick={() => setPage('login')}>Login</button>)
    }
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <Logout />
      </div>

      <Authors
        show={page === 'authors'}
        loggedin={loggedin}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'}
        setLoggedIn={setLoggedIn}
        setToken={setToken}
        setError={setError}
      />

      <Recommended
        show={page === 'recommended'}
      />
    </div>
  )
}

export default App