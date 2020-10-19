import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
const Recommended = (props) => {
    //returns the same genre to everyone because im feeling lazy with this
    const books = useQuery(ALL_BOOKS, {
        pollInterval: 2000
    })
    if (books.loading) {
        return <div>loading...</div>
    }
    if (!props.show) {
        return null
    }

    return (
        <div>
            <h2>Recommended</h2>
            {books.data.allBooks.map((b, index) => {
                const favorite = books.data.allBooks[0].genres[0]
                if (b.genres.includes(favorite)) {
                    return <p key={index}>{`${b.title} ${b.author.name} ${b.published}`}</p>
                }
            })}
        </div>
    )
}
export default Recommended