import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveWordIndex, setShow } from "../store/wordStatsSlice";
import { whichColour } from "../functions/whichColour";

const FormattedOutput = ({ text, wordData }) => {
  const [output, setOutput] = useState("");
  const bands = useSelector((state) => state.bands);
  const lineBreaks = useSelector((state) => state.text.lineBreaks);
  const dispatch = useDispatch();

  const extractPunctuation = (word) => {
    const startMatch = word.match(/^[^a-zA-Zа-яА-Я0-9]+/u);
    const endMatch = word.match(/[^a-zA-Zа-яА-Я0-9]+$/u);
    const start = startMatch ? startMatch[0] : "";
    const end = endMatch ? endMatch[0] : "";
    const trimmedWord = word.slice(start.length, word.length - end.length);
    return { start, end, trimmedWord };
  };

  useEffect(() => {
    const words = text.split(/\s+/);
    const coloredWords = words.map((word, index) => {
      // deal with puctuation at the start and end
      // store it and remove it.
      const { start, end, trimmedWord } = extractPunctuation(word);
      let lineBreak = "";
      if (lineBreaks.includes(index)) {
        lineBreak = (
          <Fragment>
            <br />
            <br />
          </Fragment>
        );
      }
      let wordLower = trimmedWord.toLowerCase();
      let totalSynonyms = wordData[wordLower] !== undefined ? wordData[wordLower].synonyms.length : 0;
      if (wordLower in wordData) {
        if (wordData[wordLower].rank !== undefined) {
          const colour = whichColour(wordData[wordLower].rank, [...bands]);
          return (
            <Fragment key={index}>
              {`${start}`}
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
                {`${trimmedWord}`}
              </span>
              {`${end} `}
              {lineBreak}
            </Fragment>
          );
        }
      }
      return (
        <Fragment key={index}>
          {`${start}${trimmedWord}${end} `}
          {lineBreak}
        </Fragment>
      );
    });
    setOutput(coloredWords);
  }, [wordData, lineBreaks, text, bands]);

  return <Fragment>{output}</Fragment>;
};

export default FormattedOutput;
