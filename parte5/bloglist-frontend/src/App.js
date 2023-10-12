import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login(
        {
          username, password
        }
      )
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    try {
      event.preventDefault()

      window.localStorage.removeItem('loggedBlogappUser')

      blogService.setToken(null)

      setUser(null)

    } catch (exception) {
      setErrorMessage('Logout error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  //BlogToAdd es una nota nueva y es la prop que enviamos al formulario
  const addBlog = async (BlogToAdd) => {

    try {
      blogFormRef.current.toggleVisibility()
      const createBlog = await blogService
        .create(BlogToAdd)

      setSuccessMessage(`a new blog ${BlogToAdd.title} added`)

      setBlogs(blogs.concat(createBlog))

      setErrorMessage(null)

      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage(
        `Cannot add blog ${BlogToAdd.title}`
      )
      setSuccessMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }

  }

  const addBlogLike = async (id) => {
    const blogToUpdate = blogs.find((blog) => blog.id === id)

    if (!blogToUpdate) {
      console.log(`No se encontró ningún blog con el ID: ${id}`)
      return
    }

    try {
      const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

      // Realiza la actualización local antes de la solicitud PUT
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) => (blog.id === id ? updatedBlog : blog))
      )

      await blogService.update(id, updatedBlog)
    } catch (error) {
      console.log('No se pudo dar like al blog:', error)
    }
  }

  const removeBlog = async (id) => {
    const blogToRemove = blogs.find((blog) => blog.id === id)

    if (!blogToRemove) {
      console.log(`No se encontró ningún blog con el ID: ${id}`)
      return
    }

    try {
      if (window.confirm(`Delete ${blogToRemove.title}?`)) {
        await blogService.remove(blogToRemove.id)
        setSuccessMessage(
          `Blog ${blogToRemove.title} was successfully deleted`
        )
        setErrorMessage(null)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setBlogs(blogs.filter((blog) => (blog.id !== id)))
      }
    } catch (exception) {
      setErrorMessage(
        `Cannot delete blog ${blogToRemove.title}`
      )
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  return (

    <div>
      <h1>BlogApp</h1>
      <Notification errorMessage={errorMessage} successMessage={successMessage}></Notification>
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />

        :
        <div>
          <p> {user.username} logged in</p>
          <button id="logout-button" onClick={handleLogout} type="submit">Logout</button>
          <Togglable buttonLabel="new blog" buttonLabel2="cancel" ref={blogFormRef}>
            <BlogForm createBlog={addBlog}></BlogForm>
          </Togglable>
          <h2>blogs</h2>
          {blogs.sort((a, b) => (b.likes - a.likes)).map(blog =>
            <Blog key={blog.id} blog={blog} addBlogLike={addBlogLike} removeBlog={removeBlog} />
          )}
        </div>
      }

    </div>
  )
}

export default App