import React, { useState } from 'react'
import PropTypes from 'prop-types'

function BlogForm({ createBlog }) {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState(0)

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value)
  }

  const handleAuthorChange = (e) => {
    setNewAuthor(e.target.value)
  }

  const handleUrlChange = (e) => {
    setNewUrl(e.target.value)
  }

  const handleLikesChange = (e) => {
    setNewLikes(e.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setNewLikes('')
  }

  return (
    <div>
      <h1>Create a new blog</h1>
      <form onSubmit={addBlog}>
        <div>
          Title:{' '}
          <input id="title" value={newTitle} onChange={handleTitleChange} />
        </div>
        <div>
          Author:{' '}
          <input id="author" value={newAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          Url: <input id="url" value={newUrl} onChange={handleUrlChange} />
        </div>
        <div>
          Likes:{' '}
          <input id="likes" value={newLikes} onChange={handleLikesChange} />
        </div>
        <button id="blog-button">Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
