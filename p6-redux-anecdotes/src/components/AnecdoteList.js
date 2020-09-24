import React from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdote)
    const dispatch = useDispatch()
    const vote = (id) => {
        dispatch(createVote(id))
        dispatch(setNotification(`Voted for '${document.getElementById(id).childNodes[0].innerHTML}'`, 3))
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
const ConnectedAnecdotes = connect()(AnecdoteList)
export default ConnectedAnecdotes