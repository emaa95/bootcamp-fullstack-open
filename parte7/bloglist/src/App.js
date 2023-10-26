import React, { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initialBlogs } from './reducers/blogReducer'
import BlogLIst from './components/BlogLIst'
import { initialUser } from './reducers/authReducer'
import { logout } from './reducers/authReducer'

const App = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  console.log(auth)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initialUser())
    dispatch(initialBlogs())
  }, [dispatch])
 
  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <div>
      <h1>BlogApp</h1>
      <Notification></Notification>
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
        </div>
      )}
    </div>
  )
}

export default App
