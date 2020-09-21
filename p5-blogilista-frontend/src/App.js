import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [notification, setNotification] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user.name)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setNotification("wrong credentials")
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }
  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setNotification("logged out")
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  const loginForm = () => (
    <div>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
        notification={notification}
      />
    </div>
  )
  const blogForm = () => (
    <div>
      <BlogForm
        blogService={blogService}
        setBlogs={setBlogs}
        setTitle={setTitle}
        setUrl={setUrl}
        setAuthor={setAuthor}
        blogs={blogs}
        notification={notification}
        setNotification={setNotification}
        user={user}
        handleLogout={handleLogout}
        title={title}
        author={author}
        url={url}
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        handleUrlChange={({ target }) => setUrl(target.value)}
      />
    </div>
  )
  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <div>
        {user === null ? loginForm() : blogForm()}
      </div>
    </div>
  )
}

export default App