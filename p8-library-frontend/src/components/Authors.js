
import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

const ALL_AUTHORS= gql`
query {
  allAuthors  {
    name
    born
    bookCount
  }
}
`
const EDIT_BORN = gql`
  mutation changeBorn($name: String!, $born: Int!) {
    editAuthor (
      name: $name,
      setBornTo: $born
    ) {
      name
      born
      bookCount
    }
  }
`
const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  const [changeBorn] = useMutation(EDIT_BORN)
  const submit = (event) => {
    event.preventDefault()
    changeBorn({ variables: { name, born } })
    setName('')
    setBorn('')
  }
  if(authors.data === undefined) {
    return <div>No Data</div>
  }
  if (authors.loading) {
    return <div>loading...</div>
  }
  if (!props.show) {
    return null
  }
  return (
    <div>
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
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({target}) => setName(target.value)}>
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

export default Authors
