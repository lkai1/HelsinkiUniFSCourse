import React from 'react'

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <h2>login to application</h2>
      <p>{props.notification}</p>
      <div>
                username
        <input
          value={props.username}
          name="Username"
          onChange={props.handleUsernameChange}
        />
      </div>
      <div>
                password
        <input
          type="password"
          value={props.password}
          name="Password"
          onChange={props.handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}
export default LoginForm