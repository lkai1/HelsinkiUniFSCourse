import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import { useDispatch, useSelector } from 'react-redux'
import storage from '../utils/storage'
import { savedUser } from '../reducers/userReducer'
import User from './User'
import Navigation from './Navigation'
const Users = () => {

    const [users, setUsers] = useState([])
    useEffect(() => {
        userService.getAll().then(response =>
            setUsers(users.concat(response.data)))
    }, [])
    return (
        <div>
            <Navigation/>
            {users.map(user =>
                <User
                    key={user.id}
                    blogs={user.blogs}
                    username={user.username}
                    name={user.name}
                    id={user.id}
                />)}
        </div>
    )
}
export default Users