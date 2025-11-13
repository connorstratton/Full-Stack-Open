import { useState } from 'react'

const Average = (props) => {
  const avg = (props.v1 - props.v3)/props.total
  return <span>{avg}</span>
}

const Percent = (props) => {
  const p = props.pos / props.total
  return <span>{p} %</span>
}

const Button = (props) => {
  return(
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  return(
    <p>{props.text} {props.value}</p>
  )
}

const Statistics = (props) => {
  if (props.v1 === 0 && props.v2 === 0 && props.v2 === 0)
  {
    return (<div>no feedback given</div>)
  }
  
  const total = props.v1 + props.v2 + props.v3
  return(
    <div>
      <StatisticLine text="good" value={props.v1} />
      <StatisticLine text="neutral" value={props.v2} />
      <StatisticLine text="bad" value={props.v3} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={<Average v1={props.v1} v3={props.v3} total={total}/>} />
      <StatisticLine text="positive" value={<Percent pos={props.v1} total={total} />} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newGood => {
    setGood(newGood)
  }

  const setToNeutral = newNeutral => {
    setNeutral(newNeutral)
  }

  const setToBad = newBad => {
    setBad(newBad)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setToGood(good + 1)} text='good'/>
      <Button onClick={() => setToNeutral(neutral + 1)} text='neutral'/>
      <Button onClick={() => setToBad(bad + 1)} text='bad'/>

      <h1>statistics</h1>
      <Statistics v1={good} v2={neutral} v3={bad}/>
    </div>
  )
}

export default App