import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ number, text, percent }) => {
  return percent ? (
    <tr>
      <th>{text}:</th>
      <th>{number}%</th>
    </tr>
  ) : (
    <tr>
      <th>{text}:</th>
      <th>{number}</th>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, all }) => {
  return all > 0 ? (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <Statistic text={"good"} number={good} />
          <Statistic text={"neutral"} number={neutral} />
          <Statistic text={"bad"} number={bad} />
          <Statistic text={"all"} number={all} />
          <Statistic text={"average"} number={(good + bad * -1) / all} />
          <Statistic text={"positive"} number={good / all} percent={true} />
        </tbody>
      </table>
    </div>
  ) : (
    <div>
      <h1>Statistics</h1>
      <p>No feedback given</p>
    </div>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    setAll(bad + neutral + updatedGood);
  };
  const handleNeutral = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setAll(bad + updatedNeutral + good);
  };
  const handleBad = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setAll(updatedBad + neutral + good);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGood} text={"good"} />
      <Button handleClick={handleNeutral} text={"neutral"} />
      <Button handleClick={handleBad} text={"bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
};

export default App;
