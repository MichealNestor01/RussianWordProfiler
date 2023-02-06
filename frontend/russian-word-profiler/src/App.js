import { Fragment, useEffect, useState, useReducer } from "react";
import axios from "axios";
import background from "./assets/background.png";
import MainEditor from "./components/MainEditor";
import FormattedOutput from "./components/FormattedOutput";
import BandsSelector from "./components/BandsSelector";

const apiURL = "russian-word-profiler-api.fseggvhtdefnbdez.uksouth.azurecontainer.io:5000";

const band_color = {
  0: "#eb4334",
  1000: "#eb9934",
  2000: "#ebe134",
  3000: "#40eb34",
};

function App() {
  const [input, setInput] = useState("");
  //const [bands, setBands] = useState([]);
  const [wordData, setWordData] = useState([]);
  const [wordBandPairs, setWordBandPairs] = useState({});
  //const [textFormat, textFormatDispatch] = useReducer(textFormatReducer, {
  //  lineBreaks: [],
  //});

  const submitHandler = async () => {
    const response = await axios({
      method: "post",
      url: `http://localhost/scantext/`,
      data: { text: input },
    });
    if (response.status === 200) {
      //setBands(response.data);
      console.log(response.data);
      setWordData(response.data);
    }
  };

  /*
  useEffect(() => {
    let newWordBandPairs = {};
    bands.forEach((band) => {
      band.entries.forEach((entry) => {
        newWordBandPairs[entry.lemma] = band.from;
      });
    });
    setWordBandPairs(newWordBandPairs);
    console.log(wordBandPairs);
  }, [bands]);
  */

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
      <div className="image-container">
        <img src={background} className="image" />
      </div>
    </div>
  );
}

export default App;
