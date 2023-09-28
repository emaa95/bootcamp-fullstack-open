import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [error, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)  
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
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
      setTimeout(()=> {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  const handleLogout = async (event) => {
      try{

        event.preventDefault()
        
        window.localStorage.removeItem('loggedBlogappUser')
        
        blogService.setToken(null);

        setUser(null);

      } catch (exception) {
        setErrorMessage('Logout error')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
  }
  return (
    
    <div>
      <h1>BlogApp</h1>
      { user === null ? 
        <LoginForm
          handleLogin = {handleLogin}
          username = {username} 
          setUsername = {setUsername}
          password = {password}
          setPassword = {setPassword}
        /> 
        
        :
        <div>
        <p> {user.username} logged in</p>
        <button id="logout-button" onClick={handleLogout} type="submit">Logout</button>
        <h2>blogs</h2>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
        </div>
      }
      
    </div>
  )
}

export default App