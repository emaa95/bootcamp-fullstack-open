import React, {useState} from 'react'
import PropTypes from 'prop-types'

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
    
    <div style={blogStyle} id='blog' className='blog'>
      <div>
      {blog.title} - {blog.author} <button id='view-button' className='viewButton' onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}> 
      <p>Url: {blog.url}</p>
      <p>likes: {blog.likes}<button id="likes-button" className='likeButton' onClick={() => addBlogLike(blog.id)}> like </button></p>
      <button id="remove-button" onClick={() => removeBlog(blog.id)}>remove</button>
      </div>
     
    </div>
    
  )
}

Blog.propTypes={
  blog: PropTypes.object.isRequired,
  addBlogLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog