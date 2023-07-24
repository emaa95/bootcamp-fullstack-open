import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Header = props => <h1>{props.name}</h1>


const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatisticLine = (props) => {
  return(
    <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
  );
};

const Statistics = (props) => {
    const all = props.good + props.neutral + props.bad
    const average = (props.good * 1 + props.bad * -1) / all
    const positive = props.good * (100/all)
    
    if (all === 0){
      return (
        <div>
          No feedback given
        </div>
      )
    } 
    
    return(
      <div>
        <table>
          <tbody>
            <StatisticLine text="good" value={props.good} />
            <StatisticLine text="neutral" value={props.neutral} />
            <StatisticLine text="bad" value={props.bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} />
          </tbody>
        </table>
      </div>
    )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () =>{
    setGood(good + 1);
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }

  const handleBadClick = () => {
    setBad(bad + 1 );
  }

  return (
    <div>
      <Header name = "give feedback"></Header>
      <Button handleClick = {handleGoodClick} text ="good"></Button>
      <Button handleClick= {handleNeutralClick} text ="neutral"></Button>
      <Button handleClick={handleBadClick} text="bad"> </Button>

      <Header name="stadistics"></Header>
      <Statistics good = {good} neutral = {neutral} bad = {bad}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)