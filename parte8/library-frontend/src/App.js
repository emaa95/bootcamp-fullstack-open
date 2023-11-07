import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import BornForm from './components/BornForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)

  const notify = (message) => {    
    setErrorMessage(message)    
    setTimeout(() => {      
      setErrorMessage(null)    
    }, 10000)  
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('changeBorn')}> change born</button>
      </div>

      <Notify errorMessage={errorMessage}></Notify>
      
      <Authors show={page === 'authors'} notify={notify}/>

      <Books show={page === 'books' } notify={notify} />

      <NewBook show={page === 'add' } notify={notify} />

      <BornForm show= {page === 'changeBorn'} notify={notify}/>

    </div>
  )
}

export default App