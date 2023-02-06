import { useState, useEffect, Fragment } from "react";

const band_color = [
  { end: 1000, colour: "#9c058f" },
  { end: 2000, colour: "#050a9c" },
  { end: 3000, colour: "#179c05" },
  { end: 60000, colour: "#9c9205" },
];

const whichColour = (rank) => {
  if (rank === "not listed") {
    return "#9c0f05";
  }
  for (let bandIndex = 0; bandIndex < band_color.length; bandIndex++) {
    const band = band_color[bandIndex];
    if (rank < band.end) {
      return band.colour;
    }
  }
};

const FormattedOutput = ({ text, wordBandPairs, textFormat, wordData }) => {
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
      if (wordLower in wordData) {
        console.log(wordLower);
        console.log(wordData[wordLower]);
        console.log(wordData[wordLower].rank);
        if (wordData[wordLower].rank !== undefined) {
          const colour = whichColour(wordData[wordLower].rank);
          console.log(colour);
          return (
            <Fragment>
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
        <Fragment>
          {`${word}${end} `}
          {lineBreak}
        </Fragment>
      );

      /*
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
      */
    });
    //console.log("COLOURED WORDS:");
    //console.log(coloredWords);
    setOutput(coloredWords);
  }, [wordData, textFormat, text]);

  return <Fragment>{output}</Fragment>;
};

export default FormattedOutput;
