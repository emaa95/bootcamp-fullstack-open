import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

function BlogForm() {
  
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    const blogToCreate = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }

    dispatch(createBlog(blogToCreate))
    dispatch(
      setNotification(`Blog ${title} successfully created`, 'success', 5)
    )
  }

  return (
    <div>
      <h1>Create a new blog</h1>
      <form onSubmit={addBlog}>
        <div>
          Title:{' '}
          <input id="title" />
        </div>
        <div>
          Author:{' '}
          <input id="author" />
        </div>
        <div>
          Url: <input id="url"  />
        </div>
        <button id="blog-button">Create</button>
      </form>
    </div>
  )
}


export default BlogForm
