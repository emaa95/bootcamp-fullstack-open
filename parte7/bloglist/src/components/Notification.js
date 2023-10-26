import React from 'react'
import { useSelector } from 'react-redux'

const successStyle = {
  color: 'green',
  background: 'lightgrey',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10,
}

const errorStyle = {
  color: 'red',
  background: 'lightgrey',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10,
}

const Notification = () => {

  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  } 

  if (notification.type === 'success')
    {
    return (
      <div id="success" style={successStyle}>
        {notification.message}
      </div>
    )
  } else {
    return (
      <div id="error" style={errorStyle}>
        {notification.message}
      </div>
    )
  }
}


export default Notification
