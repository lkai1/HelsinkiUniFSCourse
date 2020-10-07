import React from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'
const Notification = () => {
  const message = useSelector(state => state.notification)
  if (!message) {
    return null
  }

  return <div className="container">
    <Alert variant="success">
      {message}
    </Alert>
  </div>
}

export default Notification