import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {  useMutation, useQuery , useQueryClient} from 'react-query'
import { getAnecdotes, updateAnecdote } from './components/requests'
import { NotificationProvider, useNotification } from './NotificationContext'

const Anecdote = ({ anecdote }) => {
  
  const queryClient = useQueryClient()
  const {showNotification} = useNotification()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: 
      () => {
        queryClient.invalidateQueries('anecdotes')
      }
  })

  const handleVote = () => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes +1})
    showNotification(`${anecdote.content} voted`)
  }



  return (
  <div>
      <div>
          {anecdote.content}
      </div>
      <div>
          has {anecdote.votes}
          <button onClick={handleVote}>vote</button>
      </div>
  </div>
  )
}



const App = () => {
  
  const result = useQuery('anecdotes', getAnecdotes, {
    retry: 1
  })

  console.log(getAnecdotes)
  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.error) {
    return <div>Error: {result.error.message}</div>;
  }

  const anecdotes = result.data

  return (
   
    <div>
     <NotificationProvider>      
     <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
       
        <Anecdote key={anecdote.id} anecdote={anecdote}/>
      )}
      </NotificationProvider>
    </div>
   
  )
}

export default App
