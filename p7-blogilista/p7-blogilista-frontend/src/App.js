import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import { Table, Form, Button } from 'react-bootstrap'
import blogService from './services/blogs'
import loginService from './services/login'
import storage from './utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import { addBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { savedUser } from './reducers/userReducer'
import { Route, Link } from 'react-router-dom'
import Navigation from './components/Navigation'
const App = () => {
  const blogs = useSelector(state => state.blog)
  console.log(blogs)
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = React.createRef()
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll()
      .then(blogs =>
        dispatch(addBlog(blogs))
      )
  }, [])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(savedUser(user))
  }, [])

  const notifyWith = (message) => {
    console.log(message)
    dispatch(notify(message))
    setTimeout(() => {
      dispatch(notify(""))
    }, [2000])
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      dispatch(savedUser(user))
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch (exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      dispatch(addBlog(newBlog))
      notifyWith(`a new blog '${newBlog.title}' by ${newBlog.author} added!`)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    await blogService.update(likedBlog)
    dispatch(likeBlog(blogs.map(b => b.id === id ? { ...blogToLike, likes: blogToLike.likes + 1 } : b)))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      await blogService.remove(id)
      dispatch(removeBlog(blogs, blogToRemove))
      notifyWith(`removed ${blogToRemove.title} by ${blogToRemove.author}`)
    }
  }

  const handleLogout = () => {
    dispatch(savedUser(null))
    storage.logoutUser()
  }

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>
        <Notification />
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <Form.Label>password:</Form.Label>
            <Form.Control
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button variant="primary" type="submit" id='login'>login</Button>
          </Form.Group>
        </Form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div className="container">
      <Navigation/>
      <h2>blogs</h2>

      <Notification />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username === blog.user.username}
        />
      )}
    </div>
  )
}

export default App