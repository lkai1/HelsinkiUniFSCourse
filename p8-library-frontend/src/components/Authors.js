
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BORN } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [error, setError] = useState('')

  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  const [changeBorn] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })
  const submit = (event) => {
    event.preventDefault()
    changeBorn({ variables: { name, born } })
    setName('')
    setBorn('')
  }
  if (authors.data === undefined) {
    return <div>No Data</div>
  }
  if (authors.loading) {
    return <div>loading...</div>
  }
  if (!props.show) {
    return null
  }
  if (name === '') {
    setName(authors.data.allAuthors[0].name)
  }
  const SetBDay = () => {

    return (
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <div>
            name
          <select value={name} onChange={({ target }) => setName(target.value)}>
              {authors.data.allAuthors.map(a =>
                <option key={a.name}>{a.name}</option>
              )}
            </select>
          </div>
          <div>
            born
          <input
              value={born}
              onChange={({ target }) => setBorn(Number(target.value))}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      {error}
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {!props.loggedin ? <span></span> : <SetBDay />}
    </div>
  )
}

export default Authors
