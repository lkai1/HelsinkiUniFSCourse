import React from 'react'
import Togglable from './Togglable'
import Blog from './Blog'

const BlogForm = (props) => {
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: props.title,
      author: props.author,
      url: props.url
    }
    props.blogService
      .create(blogObject)
      .then(returnedBlog => {
        props.setBlogs(props.blogs.concat(returnedBlog))
        props.setTitle('')
        props.setAuthor('')
        props.setUrl('')
        props.setNotification('a new blog added')
        setTimeout(() => {
          props.setNotification(null)
        }, 5000)
      })
      .catch((error) => {
        console.log(error)
        props.setNotification('try again!')
        setTimeout(() => {
          props.setNotification(null)
        }, 5000)
      })
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>{props.notification}</p>
      <span>{`${props.user} logged in `}</span>
      <button onClick={props.handleLogout}>logout</button>
      <br />
      <br />
      <Togglable buttonLabel='create'>
        <form onSubmit={addBlog}>
          title:
          <input
            id="title"
            value={props.title}
            onChange={props.handleTitleChange}
          />
          <br />
          author:
          <input
            id="author"
            value={props.author}
            onChange={props.handleAuthorChange}
          />
          <br />
          url:
          <input
            id="url"
            value={props.url}
            onChange={props.handleUrlChange}
          />
          <br />
          <button id="create" type="submit">create</button>
        </form>
      </Togglable>
      <span id="blogs">
        {props.blogs.sort(function (a, b) {
          return b.likes - a.likes
        }).map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </span>
    </div>
  )
}
export default BlogForm