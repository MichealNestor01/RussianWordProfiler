import { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTableData } from "../../store/slices/statsSlice";
import DownloadTableData from "../dataAggregation/downloadButtons/DownloadTableData";

/**
 * @description
 * Component for displaying lemma table data.
 *
 * ### Redux Store Interaction
 * The component uses the following parts of the Redux store:
 * - `statsSlice.lemmaFrequencyDict`: Frequency dictionary for lemmas.
 *
 * The component dispatches the following Redux actions:
 * - `setTableData`: Action to set the table data. Used so that this data can be downloaded.
 *
 * @component
 *
 * @example
 * return (
 *   <LemmaTable />
 * )
 */
const LemmaTable = () => {
  const dispatch = useDispatch();
  const [selectedBand, setSelectedBand] = useState(0);
  const bandFrequencyDict = useSelector(
    (state) => state.stats.bandFrequencyDict
  );
  const lemmaFrequencyDict = useSelector(
    (state) => state.stats.lemmaFrequencyDict
  );
  const wordData = useSelector((state) => state.text.wordData);

  // Create a dictionary with lemma as key and an array of words as value.
  const lemmaWordsDict = {};
  for (const word in wordData) {
    const { lemma, rank } = wordData[word];
    if (rank !== -1) {
      if (!lemmaWordsDict[lemma]) {
        lemmaWordsDict[lemma] = { words: [], rank };
      }
      lemmaWordsDict[lemma].words.push(word);
    } else {
      lemmaWordsDict[lemma] = { words: [word], rank: "N/A" };
    }
  }

  const bands = Object.keys(bandFrequencyDict).map((band) => {
    const { colour, active, bottomVal } = bandFrequencyDict[band];
    return { name: band, colour, active, bottomVal };
  });

  // Keep track of the lemmas that get placed in bands so we can
  // see which words are in limbo.
  const bandedLemmas = {};
  const bandsWithLemmas = [];
  bands.forEach((band) => {
    if (band.active) {
      const lemmasInBand = [];
      for (const lemma in lemmaWordsDict) {
        const { rank, words } = lemmaWordsDict[lemma];
        if (lemma in lemmaFrequencyDict) {
          const occurrences = lemmaFrequencyDict[lemma];

          if (band.name === "N/A" && rank === "N/A") {
            lemmasInBand.push({ lemma, words, rank, occurrences });
            bandedLemmas[lemma] = true;
          } else if (rank <= parseInt(band.name) && rank >= band.bottomVal) {
            lemmasInBand.push({ lemma, words, rank, occurrences });
            bandedLemmas[lemma] = true;
          }
        }
      }

      // Sort lemmasInBand by rank.
      if (band.name !== "N/A") {
        lemmasInBand.sort((a, b) => a.rank - b.rank);
      }
      bandsWithLemmas.push({ ...band, lemmas: lemmasInBand });
    }
  });

  // Add words from limbo to N/A
  for (const word in wordData) {
    const { lemma, _ } = wordData[word];

    if (!(lemma in bandedLemmas)) {
      const { rank, words } = lemmaWordsDict[lemma];
      const occurrences = 1; //lemmaFrequencyDict[lemma];

      bandsWithLemmas
        .find((item) => item.name === "N/A")
        .lemmas.push({ lemma, words, rank, occurrences });
    }
  }
  dispatch(setTableData(bandsWithLemmas));

  return (
    <Fragment>
      <div className="lemmaFull card">
        <div className="cardHeader">
          <h1 className="title">
            Frequency Lemma Table <DownloadTableData />
          </h1>
          <div className="activeBandContainer">
            <div className="bands">
              {bandsWithLemmas.map((band, bandIndex) => {
                return (
                  <a
                    href="#"
                    className={
                      "band " + (bandIndex === selectedBand && "activeBand")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedBand(bandIndex);
                    }}
                    style={{
                      width: 100 / bandsWithLemmas.length + "%",
                      color:
                        bandIndex === selectedBand &&
                        bandsWithLemmas[selectedBand]?.colour,
                      textDecoration: "none",
                    }}
                  >
                    {band.name}
                  </a>
                );
              })}
            </div>
            <div
              className="activeBandSelector"
              style={{
                marginLeft: (100 / bandsWithLemmas.length) * selectedBand + "%",
                width: 100 / bandsWithLemmas.length + "%",
                backgroundColor: bandsWithLemmas[selectedBand]?.colour,
              }}
            ></div>
          </div>
        </div>
        {bandsWithLemmas[selectedBand] ? (
          <div className="lemmaTable">
            <div className="bandHeaders">
              <p>Lemma</p>
              <p>Matching Words</p>
              <p>Occurrences</p>
              <p>Rank</p>
            </div>

            <div className="bandBody">
              {bandsWithLemmas[selectedBand]?.lemmas.map(
                (lemmaObj, lemmaIndex) => {
                  return (
                    <div className="bandRow">
                      <p>{lemmaObj.lemma}</p>
                      <p>{lemmaObj.words.join(", ")}</p>
                      <p>{lemmaObj.occurrences}</p>
                      <p>{lemmaObj.rank}</p>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        ) : (
          <div className="noLemmasMessage">No Lemmas in this band</div>
        )}
      </div>
    </Fragment>
  );
};

export default LemmaTable;
