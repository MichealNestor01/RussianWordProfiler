import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveDialogue, setSelectedWord } from "../../store/slices/siteStateSlice";
import { whichColour } from "../../functions/whichColour";
import { reset, setLemmaFrequencyDict, setBandFrequencyDict } from "../../store/slices/statsSlice";

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
    let wordsNotInList = 0;
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
        // track lemma occurences:
        totalSynonyms = data.synonyms.length;
        if (data.rank !== -1) {
          if (data.lemma in lemmaFrequencyDict) {
            lemmaFrequencyDict[data.lemma]++;
          } else {
            lemmaFrequencyDict[data.lemma] = 1;
          }
        } else {
          wordsNotInList++;
        }
        // get the colour this word should be
        const [colour, band] = whichColour(wordData[wordLower].rank, [...bands]);
        // increment the total words in this band
        if (band.top in bandFrequencyDict) {
          bandFrequencyDict[band.top].total++;
        } else {
          bandFrequencyDict[band.top] = { colour, total: 0 };
        }
        // return the formatted text
        return (
          <Fragment key={`word-${index}`}>
            {prefix}
            <span
              style={
                totalSynonyms > 0 && colour !== "black"
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
              {word}
            </span>
            {postfix}{" "}
          </Fragment>
        );
      }
      return <Fragment key={`word-${index}`}>{`${prefix}${word}${postfix} `}</Fragment>;
    });
    setOutput(formattedText);
    dispatch(setBandFrequencyDict(bandFrequencyDict));
    dispatch(setLemmaFrequencyDict(lemmaFrequencyDict));
  }, [wordData, textObjects, bands, dispatch]);

  return <Fragment>{output}</Fragment>;
};

export default FormattedOutput;
