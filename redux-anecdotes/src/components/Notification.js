import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  dispatch(notify(notification))
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification === "") {
    style = {}
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification