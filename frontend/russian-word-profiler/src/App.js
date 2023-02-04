import { Fragment, useEffect, useState, useReducer } from "react";
import axios from "axios";
import background from "./assets/background.png";
import TextInput from "./components/TextInput";
import FormattedOutput from "./components/FormattedOutput";

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
  const [output, setOutput] = useState(<p></p>);
  const [bands, setBands] = useState([]);
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
      setBands(response.data);
    }
  };

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

  return (
    <div className="page-wrapper">
      <h1 className="title">Russain Word Profiler</h1>
      <section className="input-section">
        <h2>TEXT TO PROFILE:</h2>
        <TextInput
          text={input}
          setText={setInput}
          placeholder="Place text here!"
          wordBandPairs={wordBandPairs}
          textFormatDispatch={textFormatDispatch}
        />
        <button onClick={submitHandler}>Profile Text</button>
      </section>
      <section className="bottom-panel">
        <section className="left-panel">
          <section className="bands-panel">
            <h2>WORD FREQUENCY BANDS</h2>
            <ul className="card">
              <li>
                0-1000:<span style={{ color: "#eb4334" }}>This Colour</span>
              </li>
              <li>
                1000-2000:<span style={{ color: "#eb9934" }}>This Colour</span>
              </li>
              <li>
                2000-3000:<span style={{ color: "#ebe134" }}>This Colour</span>
              </li>
              <li>
                3000-4000:<span style={{ color: "#40eb34" }}>This Colour</span>
              </li>
              <li>
                5000+:<span style={{ color: "#eb34dc" }}>This Colour</span>
              </li>
            </ul>
          </section>
          <section className="data-panel">
            <h2>DATA AGREGATION</h2>
            <div className="card"></div>
          </section>
        </section>
        <section className="output-section">
          <h2>WORD FREQUENCY</h2>
          <p className="card text-output">
            <FormattedOutput text={input} wordBandPairs={wordBandPairs} textFormat={textFormat} />
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
