import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';

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
        <Stack direction={"row"} spacing={2}>
        <TextField id="title" label="Title" variant="outlined" size='small'/>
        <TextField id="author" label="Author" variant="outlined" size='small'/>
        <TextField id="url" label="Url" variant="outlined" size='small'/>
        <Button id="blog-button" variant='contained'>Create</Button>
        </Stack>
      </form>
    </div>
  )
}


export default BlogForm
