import React from 'react'
import { Link } from 'react-router-dom'
const User = ({ blogs, username, name, id }) => {
    return (
        <div>
            <h2>Users</h2>
            <Link to={`/users/id${id}`}>{name}</Link>{`, blogs: ${blogs.length}`}
        </div>
    )
}
export default User