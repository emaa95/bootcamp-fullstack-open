import { useQueryClient, useMutation } from "react-query"
import { createAnecdote } from "./requests"
import { useNotification } from "../NotificationContext"

const AnecdoteForm = () => {
  
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote, 
    onSuccess: 
    () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const { showNotification } = useNotification();

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes:0})

    showNotification('Anecdote created successfully');
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
