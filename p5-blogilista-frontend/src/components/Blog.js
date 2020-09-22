import blogService from '../services/blogs'
import React, { useEffect, useState } from 'react'

const Blog = ({ blog }) => {
  const [showBlog, setShowBlog] = useState(`${blog.title} ${blog.author}`)
  const [shown, setShown] = useState(false)
  const [viewhideText, setViewhideText] = useState('view')
  const [likes, setLikes] = useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const LikesDiv = () => {
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
    return (
      <span>
        {`likes ${likes}`}
        <button onClick={handleLike}>like</button>
      </span>
    )
  }
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to remove this blog?')) {
      blogService
        .remove(blog.id)
    }
  }
  const DeleteButton = () => {
    let user = ''
    const userObject = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
    if (userObject !== null) {
      user = userObject.name

      if (user === blog.user.name) {
        return (
          <span>
            <button onClick={handleDelete}>delete</button>
          </span>
        )
      }
    }
    return (
      <span></span>
    )
  }
  const handleShown = () => {
    if (shown) {
      setViewhideText('view')
      setShowBlog(`${blog.title} ${blog.author}`)
      setShown(false)
    } else {
      setViewhideText('hide')
      setShowBlog(
        <span id="showedBlog">
          {`${blog.title} ${blog.author}`}
          <br />
          {blog.url}
          <br />
          <LikesDiv />
          <br />
          <br />
          <DeleteButton />
          <br />
        </span>)
      setShown(true)
    }
  }
  useEffect(() => {
    setLikes(blog.likes)
  }, [blog.likes])
  return (
    <div style={blogStyle}>
      {showBlog}
      <br />
      <button onClick={handleShown}>{viewhideText}</button>
    </div>
  )
}
export default Blog
