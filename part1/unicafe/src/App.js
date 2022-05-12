import { useState } from "react"

const Header1 = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick = {onClick}>{text}</button>
  )
}

const StaticLine = ({ text, value }) => {
  if (value !== "")
    return (
      <tr>
        <td>{ text }</td>
        <td>{ value }</td>
      </tr>
    )

  return (
    <div>{ text }</div>
  )
}

const Statistics = ( { good, bad, neutral } ) => {
  const total = good + bad + neutral

  if (total)
    return (
    <>
      <Header1 text = "satistics" />

      <table>
        <tbody>
          <StaticLine text = "good" value = { good } />
          <StaticLine text = "neutral" value = { neutral } />
          <StaticLine text = "bad" value = { bad } />
          <StaticLine text = "all" value = { total } />
          <StaticLine text = "average" value = { ((good - bad) / total).toFixed(2) } />
          <StaticLine text = "positive" value = { ((good / total)  * 100).toFixed(2) + " %" } />
        </tbody>
      </table>
    </>
    )

  return (
    <>
      <Header1 text = "satistics" />

      <StaticLine text = "No feedback given" value = "" />
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)

  const incGood = () => {
    setGood(good + 1)
  }

  const incBad = () => {
    setBad(bad + 1)
  }

  const incNeutral = () => {
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <Header1 text = "give feedback" />

      <Button onClick = { incGood } text = "good" />
      <Button onClick = { incNeutral } text = "neutral" />
      <Button onClick = { incBad } text = "bad" />

      <Statistics good = { good } bad = { bad } neutral = { neutral } />
    </div>
  )
}

export default App;