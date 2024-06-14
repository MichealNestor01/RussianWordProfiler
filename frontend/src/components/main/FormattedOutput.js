import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { whichBand } from "../../functions/whichBand";
import {
  reset,
  setLemmaFrequencyDict,
  setBandFrequencyDict,
} from "../../store/slices/statsSlice";
import SynonymReplacer from "../dialogueBoxes/SynonymReplacer/SynonymReplacer";

/**
 * @description
 * Component for displaying the formatted output of the analyzed text in the Russian Word Profiler.
 * It highlights words based on their frequency band and allows synonym replacement.
 *
 * ### Redux Store Interaction
 * The component uses the following parts of the Redux store:
 * - `bandsSlice.bands`: An array of band objects used to determine the color and activity status of words.
 * - `text.tokens`: The tokens from the input text.
 * - `text.wordData`: The data associated with each word, including synonyms.
 *
 * The component dispatches the following Redux actions:
 * - `reset`: Action to reset the stats slice.
 * - `setLemmaFrequencyDict`: Action to set the frequency dictionary for lemmas.
 * - `setBandFrequencyDict`: Action to set the frequency dictionary for bands.
 *
 * @component
 *
 * @example
 * return (
 *   <FormattedOutput />
 * )
 */
const FormattedOutput = () => {
  const [output, setOutput] = useState("");
  const bands = useSelector((state) => state.bandsSlice.bands);
  const { tokens, wordData } = useSelector((state) => state.text);
  const [showSynonymReplacer, setShowSynonymReplacer] = useState(false);
  const [selectedWord, setSelectedWord] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
    // variables used for data tracking
    const lemmaFrequencyDict = {};
    const bandFrequencyDict = {};
    const formattedText = tokens.map((wordObj) => {
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

        // get the band this word falls into
        const band = whichBand(wordData[wordLower].rank, { ...bands });
        const topVal = band === -1 ? "N/A" : bands[band].topVal;
        const bottomVal = band === -1 ? "N/A" : bands[band].bottomVal;
        const active = band === -1 ? true : bands[band].active;
        const colour = band === -1 || !active ? "black" : bands[band].colour;
        console.log(bands[band]);

        if (active) {
          // increment the total words in this band
          if (topVal in bandFrequencyDict) {
            bandFrequencyDict[topVal].total++;
          } else {
            bandFrequencyDict[topVal] = { colour, total: 1, active, bottomVal };
          }
          // track lemma occurrences:
          totalSynonyms = data.synonyms.length;
          if (data.lemma in lemmaFrequencyDict) {
            lemmaFrequencyDict[data.lemma]++;
          } else {
            lemmaFrequencyDict[data.lemma] = 1;
          }
        }

        // return the formatted text
        return (
          <Fragment key={`word-${index}`}>
            {prefix}
            <span
              style={
                totalSynonyms > 0 && band !== -1
                  ? {
                      color: colour,
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
                  setSelectedWord({
                    index,
                    word,
                    colour,
                    synonyms: wordData[wordLower].synonyms,
                  });
                  setShowSynonymReplacer(true);
                  // dispatch(
                  //   setSelectedWord({
                  //     index,
                  //     word,
                  //     colour,
                  //     synonyms: wordData[wordLower].synonyms,
                  //   })
                  // );
                  // dispatch(setActiveDialogue("words"));
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
  }, [wordData, tokens, bands, dispatch]);

  return (
    <Fragment>
      {output}
      <SynonymReplacer
        active={showSynonymReplacer}
        onClose={() => setShowSynonymReplacer(false)}
        selectedWord={selectedWord}
      />
    </Fragment>
  );
};

export default FormattedOutput;
