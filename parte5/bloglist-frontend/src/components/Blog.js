import React from 'react'
import Togglable from './Togglable'

function Blog({ blog }) {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  

  return (
    
    <div style={blogStyle}>
      {blog.title} - {blog.author} <Togglable buttonLabel="view" buttonLabel2="hide">
      <p>{blog.url}</p>
      <p>{blog.likes}</p>
      </Togglable>
    </div>
    
  )
}

export default Blog