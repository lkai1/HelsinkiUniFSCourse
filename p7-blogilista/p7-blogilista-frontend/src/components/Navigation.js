import React from 'react'
import {Link} from 'react-router-dom'
const Navigation = () => {

    const styles={
        "padding": "2px",
        "background-color": "black"
    }
    return (
        <div>  
            <Link to='/users' style={styles}>users</Link>
            <Link to='/' style={styles}>blogs</Link>
        </div>
    )
}
export default Navigation