import React, { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'

const Togglable = forwardRef((props, ref) => {
  Togglable.displayName = 'Togglable'

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>{props.buttonLabel2}</Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  buttonLabel2: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default Togglable
