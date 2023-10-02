import React from 'react'
import Togglable from './Togglable'

function Blog({ blog, addBlogLike }) {

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
      <p>Url: {blog.url}</p>
      <div>
      likes: {blog.likes}<button id="likes-button" onClick={() => addBlogLike(blog.id)}> like </button>
      </div>
      </Togglable>
    </div>
    
  )
}

export default Blog