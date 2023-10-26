import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

function Blog({ blog }) {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonLabel = visible ? 'hide' : 'view'

  const addBlogLike = () => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`${blog.title} was updated successfully`, 'success', 5))
    console.log(blog)
  }

  const removeBlog = () => {
    dispatch(deleteBlog(blog.id))
    dispatch(setNotification(`${blog.title} was removed successfully`, 'success', 5))
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} id="blog" className="blog">
      <div>
        {blog.title} - {blog.author}{' '}
        <button
          id="view-button"
          className="viewButton"
          onClick={toggleVisibility}
        >
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        <p>Url: {blog.url}</p>
        <p>
          likes: {blog.likes}
          <button
            id="likes-button"
            className="likeButton"
            onClick={addBlogLike}
          >
            {' '}
            like{' '}
          </button>
        </p>
        <button id="remove-button" onClick={removeBlog}>
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
