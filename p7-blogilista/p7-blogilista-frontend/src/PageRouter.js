import App from './App'
import Users from './components/Users'
import UsersById from './components/UsersById'
import BlogsById from './components/BlogsById'
import { Route } from 'react-router-dom'
import React from 'react'

const PageRouter = () => {
    let url = window.location.pathname
    url = "id" + url.substring(9)
    return (
        <div>
            <Route exact path='/' component={App} />
            <Route exact path='/users' component={Users} />
            <Route exact path={`/users/${url}`} component={UsersById} />
            <Route exact path={`/blogs/${url}`} component={BlogsById} />
        </div>
    )
}
export default PageRouter