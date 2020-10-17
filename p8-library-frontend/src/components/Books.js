import React from 'react'
import { gql, useQuery } from '@apollo/client'

const ALL_BOOKS = gql`
query {
  allBooks  {
    title
    published
    author {
      name
    }
  }
}
`
const Books = (props) => {
  const books = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
  if (books.data === undefined) {
    return <div>No Data</div>
  }
  if (books.loading) {
    return <div>loading...</div>
  }
  if (!props.show) {
    return null
  }


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books