import { useState } from 'react'

const Header = ({ text }) => <h1>{ text }</h1>

const Button = ({ onClick, text }) => {
  return <button onClick = { onClick }>{ text }</button>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const votes = []
  for (let i=0;i<anecdotes.length;i++)
    votes.push(0)
   
  const [selected, setSelected] = useState(0)
  const [curVotes, setVotes] = useState(votes)

  const nxtAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const updateVotes = () => {
    const newVotes = [...curVotes]
    newVotes[selected] += 1

    setVotes(newVotes) 
  }


  //Not a React component but a helper function to find one of the anecdote with maximum votes
  const helper = () => {
    let toDisplay, mxVote = -1

    for(let i=0;i<curVotes.length;i++)
    {
      if (curVotes[i]>mxVote)
      {
        mxVote=curVotes[i]
        toDisplay=i
      }
    }

    return toDisplay 
  }

  return (
    <div>
      <Header text = "Ancedote of the day" />

      { anecdotes[selected] }

      <p>Has { curVotes[selected] } votes</p>

      <Button onClick = { updateVotes } text = "vote" />
      <Button onClick = { nxtAnecdote } text = "next anecdote" />

      <Header text = "Ancedote with most votes" />
      { anecdotes[helper()] }
    </div>
  )
}

export default App