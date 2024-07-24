import { useState } from 'react'

const Header = ({header}) => {
  return <h1>{header}</h1>
}

const Statistic = ({good, neutral, bad}) => {
  const total = good+bad+neutral
  const average = (good-bad)/total
  const positive = (good / total)*100
  if (total === 0) 
    {return (
    <div>
      <p>
        No feedback given
      </p>
    </div>)
  } else return (
    <table>
      <tbody>
        <tr>
          <td>good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>total</td>
          <td>{total}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{average}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{positive.toFixed(1)}%</td>
        </tr>
        </tbody>
    </table>
  )
}

//Obsolete since I couldn't figure out how StatisticLine could be used to generate table
const StatisticLine = ({text, value, percent}) => {
  if (percent === true) {
    return (
      <div>
        <p>
          {text} {value}%
        </p>
      </div>
    )
  } else return (
    <div>
      <p>
        {text} {value}
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
      <Header header={stats}/>
      <Statistic good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App