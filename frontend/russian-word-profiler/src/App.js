import { useState } from "react";
import axios from "axios";
import background from "./assets/background.png";
import MainEditor from "./components/MainEditor";

//const apiURL = "russian-word-profiler-api.fseggvhtdefnbdez.uksouth.azurecontainer.io:5000";

function App() {
  const [input, setInput] = useState("");
  const [wordData, setWordData] = useState([]);

  const submitHandler = async () => {
    const response = await axios({
      method: "post",
      url: `http://localhost/scantext/`,
      data: { text: input },
    });
    if (response.status === 200) {
      console.log(response.data);
      setWordData(response.data);
    } else {
      console.error(`ERROR CODE: ${response.status} - ${response.statusText}`);
    }
  };

  return (
    <div className="page-wrapper">
      <h1 className="title">Russian Word Profiler</h1>
      <section className="input-section">
        <h2>TEXT TO PROFILE:</h2>
        <MainEditor text={input} setText={setInput} wordData={wordData} placeholder="Place text here!" />
        <button onClick={submitHandler}>Profile Text</button>
      </section>
      <section className="bottom-panel">
        <section className="data-panel">
          <h2>DATA AGREGATION</h2>
          <div className="card"></div>
        </section>
      </section>
      {/* This is a background splash image */}
      <div className="image-container">
        <img src={background} alt="background splash" className="image" />
      </div>
    </div>
  );
}

export default App;
