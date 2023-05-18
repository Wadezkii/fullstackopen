import React, { useState } from 'react';

const Statistics = ({ good, neutral, bad, total, avg, positive }) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>
        good {good} <br />
        neutral {neutral} <br />
        bad {bad} <br />
        total {total} <br />
        avg {avg} <br />
        positive {positive}%
      </p>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleButtonClick = (type) => {
    setTotal(total + 1);

    const updateFunctions = {
      good: setGood,
      neutral: setNeutral,
      bad: setBad,
    }
    updateFunctions[type](prevValue => prevValue + 1);
  }

  const avg = (good - bad) / total || 0
  const positive = (good / total) * 100 || 0

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => handleButtonClick('good') + (avg + 1)}>good</button>
      <button onClick={() => handleButtonClick('neutral') + (avg + 0)}>neutral</button>
      <button onClick={() => handleButtonClick('bad') + (avg + -1)}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} total={total} avg={avg} positive={positive}  />
    </div>
  );
};

export default App;