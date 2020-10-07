import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import Navigation from './Navigation'
const BlogDetails = ({ title, author, url, likes, id, user }) => {
    const urlId = window.location.pathname
    if(urlId.substring(9) !== id) {
        return (
            null
        )
    }
    return (
        <div>
            <h5>{title} by {author}</h5>
            {url}
            <br/>
            likes {likes}
            <br/>
            {user.name}
        </div>
    )
}
const UsersById = () => {
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        blogService.getAll().then(response =>
            setBlogs(blogs.concat(response))
        )
    }, [])
    if(blogs === []) {
        return (
            null
        )
    }
    console.log(blogs)
    return (
        <div>
            <Navigation/>
            {blogs.map(blog => <BlogDetails 
                title={blog.title}
                author={blog.author}
                url={blog.url}
                likes={blog.likes}
                id={blog.id}
                user={blog.user}
                />)}
        </div>
    )
}
export default UsersById