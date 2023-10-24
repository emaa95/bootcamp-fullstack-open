import React from 'react'
import PropTypes from 'prop-types'

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

function Notification({ errorMessage, successMessage }) {
  if (errorMessage === null && successMessage === null) {
    return null
  } else if (successMessage) {
    return (
      <div id="success" style={successStyle}>
        {successMessage}
      </div>
    )
  } else {
    return (
      <div id="error" style={errorStyle}>
        {errorMessage}
      </div>
    )
  }
}

Notification.propTypes = {
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
}

export default Notification
