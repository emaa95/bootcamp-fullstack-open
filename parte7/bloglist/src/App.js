import React, { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import Menu from './components/Menu'
import BlogLIst from './components/BlogLIst'
import UserList from './components/UserList'
import { useDispatch, useSelector } from 'react-redux'
import { initialBlogs } from './reducers/blogReducer'
import { initialUser } from './reducers/authReducer'
import { initialUsers} from './reducers/userReducer'
import {Routes, Route, useMatch} from 'react-router-dom'

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
              <UserList/>
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
                {!foundUser ? null : 
                <div>
                  {foundUser.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)
                  }
                </div>
                }
              </div>
            ) 
      }/>

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
                <Blog blog={foundBlog}></Blog>
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
          <h2>Blogs</h2>
          <BlogLIst></BlogLIst>
        </div>
      )}/>
    </Routes>
    </div>
  )
}

export default App
