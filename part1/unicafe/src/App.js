import React, { useState } from 'react'

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text} </td>
      <td>{value}</td>
    </tr>
  )
}

/* en tiedä onko paras ratkaisu mainittuun validateDOMNesting ongelmaan, mutta toimii*/
const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <tr>
              <td>No reviews yet</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="total" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={`${positive}%`} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleButtonClick = (type) => {
    setTotal(total + 1)

    const updateFunctions = {
      good: setGood,
      neutral: setNeutral,
      bad: setBad,
    }

    updateFunctions[type]((prevValue) => prevValue + 1)
  }

  const average = (good - bad) / total || 0
  const positive = ((good / total) * 100) || 0

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="Good" handleClick={() => handleButtonClick('good')} />
      <Button text="Neutral" handleClick={() => handleButtonClick('neutral')} />
      <Button text="Bad" handleClick={() => handleButtonClick('bad')} />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App
