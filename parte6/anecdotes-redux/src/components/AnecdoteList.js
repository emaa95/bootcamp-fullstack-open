import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote} from './../reducers/anecdoteReducer'


function AnecdoteList() {

    const dispatch = useDispatch()
    
    const anecdotes = useSelector(({filter, anecdotes}) => {
      if ( filter === null ) {
        return anecdotes
      }
      console.log(anecdotes)
      const regex = new RegExp( filter, 'i' )
      return anecdotes.filter(anecdote => anecdote.content.match(regex))
    })


    const vote = (id) => {
    console.log('vote', id)
    dispatch(
      addVote(id)
    )
  }

  return (
    <div>
        {anecdotes.sort((a,b)=> (b.votes - a.votes)).map(anecdote =>
        
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
        
      )}
      
    </div>
  )
}

export default AnecdoteList