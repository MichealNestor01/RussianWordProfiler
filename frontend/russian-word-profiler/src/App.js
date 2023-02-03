import { useState } from "react";

function App() {
  const [output, setOutput] = useState("");

  const textChangedHandler = (e) => {
    setOutput(e.target.value);
  };

  const submitHandler = async () => {
    console.log(output);
  };

  return (
    <div className="App">
      <h1>Russain Word Profiler</h1>
      <h3>Put your text:</h3>
      <textarea type="text" onChange={textChangedHandler} />
      <button onClick={submitHandler}>Scan text</button>
      <p>{output}</p>
    </div>
  );
}

export default App;
