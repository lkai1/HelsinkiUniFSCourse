import ReactDOM from 'react-dom'
import React from 'react'
import { useState } from 'react'


const Statistics = ({ stats }) => {
    if (stats[0] === 0 && stats[1] === 0 && stats[2] === 0) {
        return (
            <div>
            <h1>statistics</h1>
            <h4>No feedback given</h4>
            </div>
        )
    } else {
        return (
            <div>
                <h1>statistics</h1>
                <p>good {stats[0]}</p>
                <p>neutral {stats[1]}</p>
                <p>bad {stats[2]}</p>
                <p>all {stats[0] + stats[1] + stats[2]}</p>
                <p>average {(stats[0] - stats[2]) / (stats[0] + stats[1] + stats[2])}</p>
                <p>positive {stats[0] * 100 / (stats[0] + stats[1] + stats[2])} %</p>
            </div>
        )
    }
}
const Button = () => {
    return (
        <button></button>
    )
}
const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const statStates = [good, neutral, bad];
    return (
        <div>
            <h1>give feedback</h1>
            <button onClick={() => setGood(good + 1)}>good</button>
            <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
            <button onClick={() => setBad(bad + 1)}>bad</button>
            <Statistics stats={statStates} />
            <Button />
            <Button />
            <Button />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))