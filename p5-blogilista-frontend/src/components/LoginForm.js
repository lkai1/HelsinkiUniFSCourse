import React from 'react'

const LoginForm = (props) => {
  return (
    <form id="loginForm" onSubmit={props.handleSubmit}>
      <h2>login to application</h2>
      <p>{props.notification}</p>
      <div>
        username
        <input
          value={props.username}
          id="username"
          onChange={props.handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={props.password}
          id="password"
          onChange={props.handlePasswordChange}
        />
      </div>
      <button id="loginBtn" type="submit">login</button>
    </form>
  )
}
export default LoginForm