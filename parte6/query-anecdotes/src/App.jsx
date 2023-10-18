import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {  useMutation, useQuery , useQueryClient} from 'react-query'
import { getAnecdotes, updateAnecdote } from './components/requests'

const App = () => {

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: 
      () => {
        queryClient.invalidateQueries('anecdotes')
      }
  })


  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes +1})
  }

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
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
