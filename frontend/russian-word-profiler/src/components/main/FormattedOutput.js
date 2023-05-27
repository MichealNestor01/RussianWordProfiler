import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveDialogue, setSelectedWord } from "../../store/slices/siteStateSlice";
import { whichColour } from "../../functions/whichColour";
import { incrementBand, reset } from "../../store/slices/statsSlice";

const FormattedOutput = () => {
  const [output, setOutput] = useState("");
  const bands = useSelector((state) => state.bands);
  const { text, lineBreaks, wordData } = useSelector((state) => state.text);
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
    dispatch(reset());
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
          const [colour, band] = whichColour(wordData[wordLower].rank, [...bands]);
          if (band !== undefined) dispatch(incrementBand({ id: band.top, colour: band.colour }));
          return (
            <Fragment key={index}>
              {`${start}`}
              <span
                style={
                  totalSynonyms > 0
                    ? { color: colour, cursor: "pointer", textDecoration: "underline" }
                    : { color: colour, cursor: "auto" }
                }
                key={index}
                onClick={() => {
                  if (totalSynonyms > 0) {
                    dispatch(
                      setSelectedWord({ index, word, colour, synonyms: wordData[wordLower].synonyms })
                    );
                    dispatch(setActiveDialogue("words"));
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
  }, [wordData, lineBreaks, text, bands, dispatch]);

  return <Fragment>{output}</Fragment>;
};

export default FormattedOutput;