import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';

const Votes = ({ vote }) => {
  return (
    <span>has {vote} votes</span>
  )
}
const MostVotes = (anecdotesCopy) => {
  let mostVotes = - 1;
  let anecdote = "";
  for(let i = 0; i < anecdotesCopy.length; i++) {
    if(anecdotesCopy[i][1] > mostVotes) {
      mostVotes = anecdotesCopy[i][1];
      anecdote = anecdotesCopy[i];
    }
  }
  return (
  <span> 
    <h1>Anecdote with most votes</h1>
    {anecdote[0]}<br/>has {anecdote[1]} votes
  </span>
  )
}
const App = ({ anecdotes }) => {
  const anecdotesCopy = [...anecdotes]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(0)
  const [mostVotes, setMostVotes] = useState("")
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotesCopy[selected][0]}
      <br />
      <Votes vote={anecdotesCopy[selected][1]} />
      <br />
      <button onClick={() => { anecdotesCopy[selected][1] += 1; setVotes(anecdotesCopy[selected][1]); setMostVotes(MostVotes(anecdotesCopy))} }>vote</button>
      <button onClick={() => { setSelected(Math.floor(Math.random() * (anecdotesCopy.length))); setVotes(anecdotesCopy[selected][1]) }}>next anecdote</button>
      <br/>
      {mostVotes}
    </div >
  )
}

const anecdotes = [
  ['if it hurts, do it more often', 0],
  ['Adding manpower to a late software project makes it later!', 0],
  ['The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', 0],
  ['Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', 0],
  ['Premature optimization is the root of all evil.', 0],
  ['Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', 0]
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)