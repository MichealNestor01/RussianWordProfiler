import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveWordIndex, setShow } from "../store/wordStatsSlice";
import { whichColour } from "../functions/whichColour";

const FormattedOutput = ({ text, wordData }) => {
  const [output, setOutput] = useState("");
  const bands = useSelector((state) => state.bands);
  const lineBreaks = useSelector((state) => state.text.lineBreaks);
  const dispatch = useDispatch();

  function splitWordsAndPunctuation(text) {
    const regex = /[\w\u0400-\u04FF]+|[«»]|[^\w\s\u0400-\u04FF]/g;
    return text.match(regex);
  }

  useEffect(() => {
    const words = splitWordsAndPunctuation(text);
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
      let totalSynonyms = wordData[wordLower] !== undefined ? wordData[wordLower].synonyms.length : 0;
      if (wordLower in wordData) {
        if (wordData[wordLower].rank !== undefined) {
          const colour = whichColour(wordData[wordLower].rank, [...bands]);
          return (
            <Fragment key={index}>
              <span
                style={{ color: colour, cursor: totalSynonyms > 0 ? "pointer" : "auto" }}
                key={index}
                onClick={() => {
                  if (totalSynonyms > 0) {
                    dispatch(
                      setActiveWordIndex({ index, word, colour, synonyms: wordData[wordLower].synonyms })
                    );
                    dispatch(setShow(true));
                  }
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
