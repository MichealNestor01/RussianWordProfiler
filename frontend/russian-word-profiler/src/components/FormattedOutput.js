import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveWordIndex, setShow } from "../store/wordStatsSlice";

const FormattedOutput = ({ text, wordData }) => {
  const [output, setOutput] = useState("");
  const bands = useSelector((state) => state.bands);
  const lineBreaks = useSelector((state) => state.text.lineBreaks);
  const dispatch = useDispatch();

  const whichColour = (rank) => {
    if (rank === "not listed") {
      return "";
    }
    for (let bandIndex = 0; bandIndex < bands.length; bandIndex++) {
      const band = bands[bandIndex];
      if (rank < band.top) {
        return band.colour;
      }
    }
  };

  useEffect(() => {
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
      if (lineBreaks.includes(index)) {
        lineBreak = (
          <Fragment>
            <br />
            <br />
          </Fragment>
        );
      }
      let wordLower = word.toLowerCase();
      if (wordLower in wordData) {
        if (wordData[wordLower].rank !== undefined) {
          const colour = whichColour(wordData[wordLower].rank);
          return (
            <Fragment key={index}>
              <span
                style={{ color: colour, cursor: "pointer" }}
                key={index}
                onClick={() => {
                  dispatch(setActiveWordIndex(index));
                  dispatch(setShow(true));
                }}
              >
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
  }, [wordData, lineBreaks, text, bands]);

  return <Fragment>{output}</Fragment>;
};

export default FormattedOutput;
