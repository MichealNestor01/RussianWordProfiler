import { useState, useEffect, Fragment } from "react";

const band_color = [
  { end: 1000, colour: "#9c058f" },
  { end: 2000, colour: "#050a9c" },
  { end: 3000, colour: "#179c05" },
  { end: 60000, colour: "#9c9205" },
];

const FormattedOutput = ({ text, textFormat, wordData, colourBands }) => {
  const [output, setOutput] = useState("");

  const whichColour = (rank) => {
    if (rank === "not listed") {
      return colourBands[3].colour;
    }
    for (let bandIndex = 0; bandIndex < colourBands.length; bandIndex++) {
      const band = colourBands[bandIndex];
      if (rank < band.top) {
        return band.colour;
      }
    }
  };

  useEffect(() => {
    console.log(colourBands);
    const words = text.split(/\s+/);
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
      if (textFormat.lineBreaks.includes(index)) {
        lineBreak = (
          <Fragment>
            <br />
            <br />
          </Fragment>
        );
      }
      let wordLower = word.toLowerCase();
      console.log(wordLower);
      console.log(wordData);
      if (wordLower in wordData) {
        if (wordData[wordLower].rank !== undefined) {
          const colour = whichColour(wordData[wordLower].rank);
          return (
            <Fragment key={index}>
              <span style={{ color: colour }} key={index}>
                {`${word}`}
              </span>
              {`${end} `}
              {lineBreak}
            </Fragment>
          );
        }
      }
      return (
        <Fragment key={index}>
          {`${word}${end} `}
          {lineBreak}
        </Fragment>
      );
    });
    setOutput(coloredWords);
  }, [wordData, textFormat, text, colourBands]);

  return <Fragment>{output}</Fragment>;
};

export default FormattedOutput;
