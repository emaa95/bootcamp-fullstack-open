import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initialAnecdotes} from './reducers/anecdotesSlice'
import { useDispatch } from 'react-redux'

const App = () => {
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initialAnecdotes())
  }, [dispatch])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <Notification/>
      <Filter/>
      <AnecdoteForm/>
    </div>
  )
}

export default App
