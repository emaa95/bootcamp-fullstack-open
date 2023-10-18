import { useQueryClient, useMutation } from "react-query"
import { createAnecdote } from "./requests"
import { useNotification } from "../NotificationContext"

const AnecdoteForm = () => {
  
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(
    (content) => createAnecdote(content), 
    
    {onSuccess: 
    () => {
      queryClient.invalidateQueries('anecdotes')
      showNotification('Anecdote created successfully')
    },
    onError: (error) => {
      showNotification('Error creating anecdote: ' + error.message)
    }
  }
  )

  const { showNotification } = useNotification();

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length < 5) {
      showNotification('Anecdote must be at least 5 characters long')
    } else {
      newAnecdoteMutation.mutate({content, votes: 0})
    }    
  }


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
