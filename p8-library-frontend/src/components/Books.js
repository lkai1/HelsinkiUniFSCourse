import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const books = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState(null)
  let i = 0
  if (books.data === undefined) {
    return <div>No Data</div>
  }
  if (books.loading) {
    return <div>loading...</div>
  }
  i++
  if (!props.show) {
    return null
  }
  const allGenres = []
  if (i === 1) {
    books.data.allBooks.forEach((b) => {
      allGenres.push(b.genres)
    })
  }
  if (genre !== null) {

    const booksOfGenre = []
    books.data.allBooks.forEach((b) => {
      if (b.genres.includes(genre[0])) {
        booksOfGenre.push(b)
      }
    })
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
            {booksOfGenre.map(a =>
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
      <h4>genres</h4>
      {allGenres.map((g, index) =>
        <span key={index}>
          <button onClick={() => setGenre(g)}>{g}</button>
        </span>
      )}
    </div>
  )
}

export default Books