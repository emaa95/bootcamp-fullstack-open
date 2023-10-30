import React, { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initialBlogs } from './reducers/blogReducer'
import BlogLIst from './components/BlogLIst'
import { initialUser } from './reducers/authReducer'
import { initialUsers} from './reducers/userReducer'
import UserList from './components/UserList'
import {Routes, Route, useMatch} from 'react-router-dom'
import Blog from './components/Blog'
import { setNotification } from './reducers/notificationReducer'
import { likeBlog } from './reducers/blogReducer'
import Menu from './components/Menu'
import { comment } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const users = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blog )
  
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initialUser())
    dispatch(initialBlogs())
    dispatch(initialUsers())
  }, [dispatch])
 
  const handleLikes = (blogToLike) => {
    dispatch(likeBlog(blogToLike))
    dispatch(
      setNotification(`Blog ${blogToLike.title} successfully updated`, 'success', 5)
    )
  }

  const handleComment = (event) => {
    event.preventDefault()
    const commentToAdd = event.target.comment.value
    event.target.comment.value = ''
    dispatch(comment(foundBlog, commentToAdd))
  }

  const userMatch = useMatch('/users/:id')

  const foundUser = userMatch 
  ? users.find(user => user.id === userMatch.params.id)
  : null

  const blogMatch = useMatch('/blogs/:id')

  const foundBlog = blogMatch
  ? blogs.find(blog => blog.id === blogMatch.params.id)
  : null

  return (
    
    <div>
      <h1>BlogApp</h1>
      <Notification></Notification>
      
      <Routes>
      <Route path="/users" element = 
        {auth === null ? (
          <div>
            <Notification/>
            <LoginForm/>
          </div>
        ) : (
          <div>
              <Menu/>
              <UserList />
          </div>
        )}/>
      
      <Route path='/users/:id' element = {
        auth === null ? ( <div>
              <Notification />
              <LoginForm />
            </div>) : (
              <div>
                <Notification/>
                <Menu/>
                <h2>{auth.username}</h2>
                <h3>added blogs</h3>

                {!foundUser ? null : <div>
                  {foundUser.blogs.map(blog => <Blog key={blog.id} blog={blog}></Blog>)}
                </div>
                }
              </div>
            ) 
      }

      />

      <Route path='/blogs/:id' element={
        auth === null 
        ? (
        <div>
          <Notification/>
          <LoginForm/>
        </div>
        ) : (
          <div>
            <Menu/>
            { !foundBlog 
              ? (null)
              : (
                <div>
                <div>
                  <h1>{foundBlog.title}</h1>
                  <p>{foundBlog.url}</p>
                  <p>
                    {foundBlog.likes}
                    <button onClick={() => handleLikes(foundBlog)}>
                        like
                    </button> 
                  </p>
                  <p>added by {foundBlog.author}</p>
                </div>
                <div>
                  <h3>comments</h3>
                  <div>
                  <form onSubmit={handleComment}>
                    <input id="comment" name="comment" type='text' />
                    <button id='addComent-button' type='submit'>add comment</button>
                  </form>
                  </div>
                  { foundBlog.comments.length === 0 
                    ? <p>no hay comentarios</p>
                    : <ul>
                        {foundBlog.comments.map((comment) => <li key={comment} >{comment}</li>)}
                      </ul>
                  }
                </div>
                </div>
              )
            }
          </div>
        )
      }
         
      />
    
      <Route path='/' element = 
      {auth === null ? (
        <LoginForm/>
      ) : (
        <div>
          <Menu/>
          <Togglable
            buttonLabel="new blog"
            buttonLabel2="cancel"
            ref={blogFormRef}
          >
            <BlogForm/>
          </Togglable>
          <h2>blogs</h2>
          <BlogLIst></BlogLIst>
        </div>
      )}/>
    </Routes>
    </div>
  )
}

export default App
