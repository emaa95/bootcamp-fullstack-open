import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Anecdote = (props) =>{
  return(
    <div>
      <p>{props.text}</p>
      <p>has {props.votes} votes</p>
    </div>
  )
}

const Winner = (props) => {
  const maxVotes = Math.max(...props.votes)
  const winnerIndex = props.votes.indexOf(maxVotes)
  const winner = props.anecdotes[winnerIndex]

  if (maxVotes === 0){
    return(
        <p>Not vote yet</p>
    )
  }

  return(
    <div>
      <p>{winner}</p>

      <p>has {maxVotes} votes</p>
    </div>
  )
} 


const App = (props) => {
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(6).fill(0))

  const handleRandomClick = () =>{
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVoteClick = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)

  }

  return (
    <div>
      <h1> Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]}></Anecdote>
      <Button handleClick={handleRandomClick} text="Next anecdote"></Button>
      <Button handleClick={handleVoteClick} text="vote"></Button>
      <h1>Anecdote with most votes</h1>
      <Winner anecdotes={anecdotes} votes={votes}></Winner>
    </div>
    
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)