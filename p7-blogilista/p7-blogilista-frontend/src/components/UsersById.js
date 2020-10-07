import React, { useEffect, useState } from 'react'
import userService from '../services/users'
import Navigation from './Navigation'
const UserDetails = ({ blogs, username, name, id }) => {
    
    return (
        <div>
            <h2>{username}</h2>
            <h5>added blogs</h5>
            {blogs.map(blog => <li>{blog.title}</li>)}
        </div>
    )
}
const UsersById = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        userService.getAll().then(response =>
            setUsers(users.concat(response.data)))
    }, [])
    const id = window.location.pathname
    const user = users.find(u => u.id === id.substring(7))
    const fucku = users.map(u => <UserDetails blogs={u.blogs} username={u.username} />)
    return (
        <div>
            <Navigation/>
            {fucku}
        </div>
    )
}
export default UsersById