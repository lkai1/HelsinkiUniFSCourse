import blogService from '../services/blogs'
import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [showBlog, setShowBlog] = useState(`${blog.title} ${blog.author}`)
  const [shown, setShown] = useState(false)
  const [viewhideText, setViewhideText] = useState("view")
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleLike = (event) => {
    event.preventDefault()
    blog.likes += 1
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes
    }
    blogService
      .update(blog.id, blogObject)
  }
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to remove this blog?")) {
      blogService
        .remove(blog.id)
    }
  }
  const DeleteButton = () => {
    const userObject = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
    const user = userObject.name
    if (user === blog.user.name) {
      return (
        <span>
          <button onClick={handleDelete}>delete</button>
        </span>
      )
    }
    return (
      <span></span>
    )
  }
  const handleShown = () => {
    if (shown) {
      setViewhideText("view")
      setShowBlog(`${blog.title} ${blog.author}`)
      setShown(false)
    } else {
      setViewhideText("hide")
      setShowBlog(
        <span>
          {`${blog.title} ${blog.author}`}
          <br />
          {blog.url}
          <br />
          {`likes ${blog.likes}`}
          <button onClick={handleLike}>like</button>
          <br />
          {blog.user.name}
          <br />
          <DeleteButton />
          <br />
        </span>)
      setShown(true)
    }
  }
  return (
    <div style={blogStyle}>
      {showBlog}
      <br />
      <button onClick={handleShown}>{viewhideText}</button>
    </div>
  )
}
export default Blog
