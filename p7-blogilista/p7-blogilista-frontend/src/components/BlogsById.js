import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import Navigation from './Navigation'
import { initialBlogs } from '../reducers/blogReducer'
const BlogDetails = ({ title, author, url, likes, id, user }) => {
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
    const dispatch = useDispatch()
    const urlId = window.location.pathname
    useEffect(() => {
        blogService.getAll()
          .then(blogs =>
            dispatch(initialBlogs(blogs))
          )
      }, [])
    const blogs = useSelector(state => state.blog)
    console.log(blogs)
    const blogsByid = blogs.filter(blog => blog.id === urlId.substring(9))
    if(blogs === []) {
        return (
            <div></div>
        )
    }
    console.log(blogs)
    return (
        <div>
            <Navigation/>
            {blogsByid.map(blog => <BlogDetails 
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