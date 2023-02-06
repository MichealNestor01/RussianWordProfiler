import { Fragment, useEffect, useState, useReducer } from "react";
import axios from "axios";
import background from "./assets/background.png";
import TextInput from "./components/TextInput";
import FormattedOutput from "./components/FormattedOutput";
import BandsSelector from "./components/BandsSelector";

const apiURL = "russian-word-profiler-api.fseggvhtdefnbdez.uksouth.azurecontainer.io:5000";

const band_color = {
  0: "#eb4334",
  1000: "#eb9934",
  2000: "#ebe134",
  3000: "#40eb34",
};

function textFormatReducer(state, action) {
  switch (action.type) {
    case "add_paragraph_end":
      if (state.lineBreaks.includes(action.index)) {
        return state;
      }
      return { ...state, lineBreaks: [...state.lineBreaks, action.index] };
    case "set_line_breaks":
      return { ...state, lineBreaks: action.new };
  }
}

function App() {
  const [input, setInput] = useState("");
  //const [bands, setBands] = useState([]);
  const [wordData, setWordData] = useState([]);
  const [wordBandPairs, setWordBandPairs] = useState({});
  const [textFormat, textFormatDispatch] = useReducer(textFormatReducer, {
    lineBreaks: [],
  });

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
        <TextInput
          text={input}
          setText={setInput}
          placeholder="Place text here!"
          textFormatDispatch={textFormatDispatch}
        />
        <button onClick={submitHandler}>Profile Text</button>
      </section>
      <section className="bottom-panel">
        <section className="left-panel">
          <section className="bands-panel">
            <h2>WORD FREQUENCY BANDS</h2>
            <BandsSelector />
          </section>
          <section className="data-panel">
            <h2>DATA AGREGATION</h2>
            <div className="card"></div>
          </section>
        </section>
        <section className="output-section">
          <h2>WORD FREQUENCY</h2>
          <p className="card text-output">
            <FormattedOutput
              text={input}
              wordBandPairs={wordBandPairs}
              wordData={wordData}
              textFormat={textFormat}
            />
          </p>
        </section>
      </section>
      <div className="image-container">
        <img src={background} className="image" />
      </div>
    </div>
  );
}

export default App;
