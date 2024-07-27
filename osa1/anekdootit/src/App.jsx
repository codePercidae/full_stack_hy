import { useState } from 'react'

const Header = ({header}) => {
  return (
    <div>
     <h1>{header}</h1>
    </div>
  )
}

const MaxIndex = ({votes}) => {
  var max = votes[0]
  var maxIndex = 0

  for (let i = 0; i < 8; i++) {
    if (votes[i] > max) {
      maxIndex = i
    }
  }
  return maxIndex
} 

const App = () => {
  const title = "Anecdote of the day"
  const subTitle = "Anecdote with most votes"
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(8))

  const handleVotes = () => {
    const newVotes = [... votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  console.log(votes[selected])

  return (
    <div>
      <Header header={title}/>
      <p>
        {anecdotes[selected]} <br />
        has {votes[selected]} votes 
      </p>
      <button onClick={() => setSelected(Math.floor(Math.random() * 8))}>next anecdote</button>
      <button onClick={handleVotes}>vote</button>
      <Header header={subTitle}/>
      <p>{anecdotes[MaxIndex({votes})]}</p>
    </div>
  )
}

export default App
