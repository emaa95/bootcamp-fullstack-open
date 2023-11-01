import React from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, TextField, Tooltip } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { comment } from '../reducers/blogReducer';


function Blog({ blog }) {
  const dispatch = useDispatch()

  const addBlogLike = () => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`${blog.title} was updated successfully`, 'success', 5))
    console.log(blog)
  }

  const removeBlog = () => {
    dispatch(deleteBlog(blog.id))
    dispatch(setNotification(`${blog.title} was removed successfully`, 'success', 5))
  }
  
  const handleComment = (event) => {
    event.preventDefault()
    const commentToAdd = event.target.comment.value
    event.target.comment.value = ''
    dispatch(comment(blog, commentToAdd))
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
          {blog.title}
          <Tooltip title="Delete">
              <IconButton onClick={removeBlog}>
                <DeleteIcon />
              </IconButton>
          </Tooltip>
        </Typography>
    
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {blog.url}
        </Typography>
        <Typography variant="body2">
          {blog.likes}
          <Tooltip>
            <IconButton onClick={addBlogLike}>
              <ThumbUpIcon></ThumbUpIcon>
            </IconButton>
          </Tooltip>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <p>added by {blog.author}</p>
        </Typography>
      </CardContent>
      <div>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <h3>comments</h3>
        </AccordionSummary>
        <AccordionDetails>
        <Grid container spacing={2}>
          <form onSubmit={handleComment}>
          <TextField id="comment" label="comment" variant='outlined' size='small'/>
          <Button id="addComent-button" type='submit'>add comment</Button>
          </form>
        </Grid>
        <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
            <List>
            <ListItem>
              {(!blog.comments || blog.comments.length === 0) ? (
             <p>No hay comentarios</p>
             ) : (
              blog.comments.map((comment) => (
              <span key={comment}>{comment}</span>
      ))
    )}
  </ListItem>
              
            </List>
        </Grid>
        </Grid>
        </AccordionDetails>
        </Accordion>
      </div>
    </Card>
  )
}

export default Blog
