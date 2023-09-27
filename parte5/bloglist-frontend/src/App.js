import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [allBlogs, setAllBlogs] = useState('')
  const [error, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login(
        {
          username, password
        }
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