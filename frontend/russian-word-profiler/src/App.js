import { Fragment, useEffect, useState } from "react";
import axios from "axios";

import TextInput from "./components/TextInput";

const apiURL = "russian-word-profiler-api.fseggvhtdefnbdez.uksouth.azurecontainer.io:5000";

const band_color = {
  0: "#eb4334",
  1000: "#eb9934",
  2000: "#ebe134",
  3000: "#40eb34",
};

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(<p></p>);
  const [bands, setBands] = useState([]);

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
    const wordBandPair = {};
    bands.forEach((band) => {
      band.entries.forEach((entry) => {
        wordBandPair[entry.lemma] = band.from;
      });
    });

    const words = input.split(" ");
    const coloredWords = words.map((word, index) => {
      let end = "";
      if (
        word[word.length - 1] === "," ||
        word[word.length - 1] === "." ||
        word[word.length - 1] === ";" ||
        word[word.length - 1] === "!" ||
        word[word.length - 1] === "?"
      ) {
        end = word[word.length - 1];
        word = word.slice(0, word.length - 1);
      }
      let wordLower = word.toLowerCase();
      if (wordLower in wordBandPair) {
        if (wordBandPair[wordLower] in band_color) {
          return (
            <Fragment>
              <span style={{ color: band_color[wordBandPair[wordLower]] }} key={index}>
                {`${word}`}
              </span>
              {`${end} `}
            </Fragment>
          );
        } else {
          return (
            <Fragment>
              <span style={{ color: "#eb34dc" }} key={index}>
                {`${word}${end} `}
              </span>
              {`${end} `}
            </Fragment>
          );
        }
      } else {
        return `${word}${end} `;
      }
    });
    console.log(coloredWords);
    setOutput(coloredWords);
  }, [bands]);

  return (
    <div className="App">
      <h1>Russain Word Profiler</h1>
      <h3>Put your text:</h3>
      <TextInput text={input} setText={setInput} placeholder="Place text here!" />
      <button onClick={submitHandler}>Scan text</button>
      <p>{output}</p>
      <h3>Bands:</h3>
      <ul>
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
    </div>
  );
}

export default App;
