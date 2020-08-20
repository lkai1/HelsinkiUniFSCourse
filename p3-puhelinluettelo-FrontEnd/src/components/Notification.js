import React, { useState, useEffect } from 'react'

const Notification = ({ madeChange }) => {
    const [style, setStyle] = useState(
        {
            color: 'green',
            background: 'lightgrey',
            fontSize: '20px',
            borderStyle: 'solid',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '10px',
        }

    )
    const [message, setMessage] = useState('')
    useEffect(() => {
        if(madeChange.startsWith("Information") || madeChange.startsWith(`"Person validation failed:`)) {
            setStyle({
                color: 'red',
                background: 'lightgrey',
                fontSize: '20px',
                borderStyle: 'solid',
                borderRadius: '5px',
                padding: '10px',
                marginBottom: '10px',
            })
        } else {
            setStyle({
                color: 'green',
                background: 'lightgrey',
                fontSize: '20px',
                borderStyle: 'solid',
                borderRadius: '5px',
                padding: '10px',
                marginBottom: '10px',
            })
        }
        setMessage(madeChange)
    }, [madeChange])
    setTimeout(() => {
        setMessage('')
    }, 10000)

    return (
        <div>
           {message === '' ? <p></p> : <p style={style}>{message}</p>}
        </div>
    )
}
export default Notification