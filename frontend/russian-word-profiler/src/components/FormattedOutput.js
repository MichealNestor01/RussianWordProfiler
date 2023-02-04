import { useState, useEffect, Fragment } from "react";

const band_color = {
  0: "#eb4334",
  1000: "#eb9934",
  2000: "#ebe134",
  3000: "#40eb34",
};

function FormattedOutput({ text, wordBandPairs, textFormat }) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    //console.log("Formatting text!!");
    const words = text.split(/\s+/);
    //console.log(words);
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
      let lineBreak = "";
      //console.log(word);
      if (textFormat.lineBreaks.includes(index)) {
        //console.log("FOUND LINEBREAK AT ", index);
        lineBreak = (
          <Fragment>
            <br />
            <br />
          </Fragment>
        );
      }
      let wordLower = word.toLowerCase();
      if (wordLower in wordBandPairs) {
        if (wordBandPairs[wordLower] in band_color) {
          return (
            <Fragment>
              <span style={{ color: band_color[wordBandPairs[wordLower]] }} key={index}>
                {`${word}`}
              </span>
              {`${end} `}
              {lineBreak}
            </Fragment>
          );
        } else {
          return (
            <Fragment>
              <span style={{ color: "#eb34dc" }} key={index}>
                {`${word}${end} `}
              </span>
              {`${end} `}
              {lineBreak}
            </Fragment>
          );
        }
      } else {
        return (
          <Fragment>
            {`${word}${end} `}
            {lineBreak}
          </Fragment>
        );
      }
    });
    //console.log("COLOURED WORDS:");
    //console.log(coloredWords);
    setOutput(coloredWords);
  }, [wordBandPairs, textFormat, text]);

  return <Fragment>{output}</Fragment>;
}

export default FormattedOutput;
