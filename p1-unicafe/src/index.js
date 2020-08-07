import ReactDOM from 'react-dom'
import React from 'react'
import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
    return (
        <tr>
            <td>
            {text}
            </td>
            <td>
            &nbsp;
            {value}
            </td>
        </tr>
    )
}
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
                <StatisticLine text="good" value={stats[0]} />
                <StatisticLine text="neutral" value={stats[1]} />
                <StatisticLine text="bad" value={stats[2]} />
                <StatisticLine text="all" value={stats[0] + stats[1] + stats[2]} />
                <StatisticLine text="average" value={(stats[0] - stats[2]) / (stats[0] + stats[1] + stats[2])} />
                <StatisticLine text="positive" value={stats[0] * 100 / (stats[0] + stats[1] + stats[2]) + " %"} />
            </div>
        )
    }
}
const Button = ({ set, text }) => {
    return (
        <button onClick={set}>{text}</button>
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
            <Button text="good" set={() => setGood(good + 1)} />
            <Button text="neutral" set={() => setNeutral(neutral + 1)} />
            <Button text="bad" set={() => setBad(bad + 1)} />
            <Statistics stats={statStates} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))