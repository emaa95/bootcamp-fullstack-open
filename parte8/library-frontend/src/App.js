import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import BornForm from './components/BornForm'
import { useApolloClient } from '@apollo/client'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {    
    setErrorMessage(message)    
    setTimeout(() => {      
      setErrorMessage(null)    
    }, 10000)  
  }

  const logout = () => {    
    setToken(null)    
    localStorage.clear()    
    client.resetStore()  
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {/* Mostrar el botón de "add" solo si el usuario ha iniciado sesión */}
        {token && <button onClick={() => setPage('add')}>add book</button>}

        {token && <button onClick={() => setPage('changeBorn')}> change born</button>}

        {token && <button onClick={() => setPage('recommended')}> recommended</button>}
        
        {/* Mostrar el botón de "logout" solo si el usuario ha iniciado sesión */}
        {token && <button onClick={logout}>logout</button>}
        
        {/* Mostrar el botón de "login" solo si el usuario no ha iniciado sesión */}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Notify errorMessage={errorMessage}></Notify>

      
      {page === 'login' ? (
        <LoginForm show={true} setToken={setToken} setError={notify} />
      ) : (
        <div>
          <Authors show={page === 'authors'} notify={notify} />
          <Books show={page === 'books' } notify={notify} />
          
              <NewBook show={page === 'add'} notify={notify} />
              <Recommended show={page === 'recommended'} notify={notify}/>
              <BornForm show= {page === 'changeBorn'} notify={notify} />

      
   
        </div>
      )}
    </div>
  )
}

export default App
