import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveDialogue,
  setSelectedWord,
} from "../../store/slices/siteStateSlice";
import { whichBand } from "../../functions/whichBand";
import {
  reset,
  setLemmaFrequencyDict,
  setBandFrequencyDict,
} from "../../store/slices/statsSlice";

const FormattedOutput = () => {
  const [output, setOutput] = useState("");
  const bands = useSelector((state) => state.bands);
  const { textObjects, wordData } = useSelector((state) => state.text);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
    // variables used for data tracking
    const lemmaFrequencyDict = {};
    const bandFrequencyDict = {};
    const formattedText = textObjects.map((wordObj) => {
      const { index, word, prefix, postfix } = wordObj;
      // first check if the word is line breaks:
      if (word[0] === "\n") {
        return Array.from({ length: word.length }).map(() => <br />);
      }
      const wordLower = word.toLowerCase();
      let totalSynonyms = 0;
      // '\n' is treated as a word, so this will be skipped here but every other word will be in wordData
      if (wordLower in wordData) {
        const data = wordData[wordLower];
        // track lemma occurrences:
        totalSynonyms = data.synonyms.length;
        if (data.lemma in lemmaFrequencyDict) {
          lemmaFrequencyDict[data.lemma]++;
        } else {
          lemmaFrequencyDict[data.lemma] = 1;
        }
        // get the band this word falls into
        const band = whichBand(wordData[wordLower].rank, {...bands});
        const topVal = band === -1 ? "N/A" : bands[band].topVal;
        const colour = band === -1 ? "black" : bands[band].colour;
        // increment the total words in this band
        if (topVal in bandFrequencyDict) {
          bandFrequencyDict[topVal].total++;
        } else {
          bandFrequencyDict[topVal] = { colour, total: 0 };
        }
        // return the formatted text
        return (
          <Fragment key={`word-${index}`}>
            {prefix}
            <span
              style={
                totalSynonyms > 0 && band !== -1
                  ? {
                      color: bands[band].active ? colour : "black",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }
                  : {
                      color: colour,
                      cursor: "auto",
                    }
              }
              key={index}
              onClick={() => {
                if (totalSynonyms > 0) {
                  dispatch(
                    setSelectedWord({
                      index,
                      word,
                      colour,
                      synonyms: wordData[wordLower].synonyms,
                    })
                  );
                  dispatch(setActiveDialogue("words"));
                }
              }}
            >
              {word}
            </span>
            {postfix}{" "}
          </Fragment>
        );
      }
      return (
        <Fragment
          key={`word-${index}`}
        >{`${prefix}${word}${postfix} `}</Fragment>
      );
    });
    setOutput(formattedText);
    dispatch(setBandFrequencyDict(bandFrequencyDict));
    dispatch(setLemmaFrequencyDict(lemmaFrequencyDict));
  }, [wordData, textObjects, bands, dispatch]);

  return <Fragment>{output}</Fragment>;
};

export default FormattedOutput;
