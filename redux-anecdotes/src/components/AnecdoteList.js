import React, { Children } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdote)
    const dispatch = useDispatch()
    const vote = (id) => {
        dispatch(createVote(id))
        dispatch(notify(`Voted for '${document.getElementById(id).childNodes[0].innerHTML}'`))
        setTimeout(() => {
            dispatch(notify(""))
        }, [2000])
    }
    return (
        <div>
            {anecdotes.map(anecdote =>
                <div id={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ).sort(function (a, b) {
                return b.votes - a.votes
            })}
        </div>
    )
}
export default AnecdoteList