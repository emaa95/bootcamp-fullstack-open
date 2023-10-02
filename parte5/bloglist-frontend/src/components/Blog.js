import React, {useState} from 'react'
import Togglable from './Togglable'

function Blog({ blog, addBlogLike , removeBlog }) {

  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonLabel = visible ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    
    <div style={blogStyle}>
      <div>
      {blog.title} - {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}> 
      <p>Url: {blog.url}</p>
      <p>likes: {blog.likes}<button id="likes-button" onClick={() => addBlogLike(blog.id)}> like </button></p>
      <button id="remove-button" onClick={() => removeBlog(blog.id)}>remove</button>
      </div>
     
    </div>
    
  )
}

export default Blog