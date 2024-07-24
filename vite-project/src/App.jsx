const Hello = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        Hello {props.name} you are {props.age} years old
      </p>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1> Greetings </h1>
      <Hello name="Jope" age={25} />
    </div>
  );
};

export default App;
