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
import { logout } from './reducers/authReducer'
import UserList from './components/UserList'
import {Routes, Route, useMatch} from 'react-router-dom'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const users = useSelector((state) => state.user)
  
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initialUser())
    dispatch(initialBlogs())
    dispatch(initialUsers())
  }, [dispatch])
 
  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  const userMatch = useMatch('/users/:id')

  const foundUser = userMatch 
  ? users.find(user => user.id === userMatch.params.id)
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
          <p>
                {auth.username} logged in
                <button onClick={handleLogout} type="submit">
                  logout
                </button>
              </p>
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
                <p> {`${auth.username} logged in`}</p>
               <button onClick={handleLogout} type='submit'>Logout</button>
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
    
      <Route path='/' element = 
      {auth === null ? (
        <LoginForm/>
      ) : (
        <div>
          <p> {`${auth.username} logged in`}</p>
          <button onClick={handleLogout} type='submit'>Logout</button>
          <Togglable
            buttonLabel="new blog"
            buttonLabel2="cancel"
            ref={blogFormRef}
          >
            <BlogForm/>
          </Togglable>
          <h2>blogs</h2>
          <BlogLIst></BlogLIst>
          <UserList></UserList>
        </div>
      )}/>
    </Routes>
    </div>
  )
}

export default App
