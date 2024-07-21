import { useState } from 'react'

const Header = ({header}) => {
  return <h1>{header}</h1>
}

const ShowStatistic = ({good, neutral, bad}) => {
  const total = good+bad+neutral
  const average = total/3
  const positive = good / total
  console.log(good, neutral, bad)
  return (
    <div>
      <p>
        good {good} <br />
        neutral {neutral} <br /> 
        bad {bad} <br />
        total {total} <br />
        average {average} <br />
        positive {positive}%
      </p>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const feedback = "Give feedback"
  const stats = "Statistics"
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <Header header={feedback}/>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Header header={stats}></Header>
      <ShowStatistic good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App