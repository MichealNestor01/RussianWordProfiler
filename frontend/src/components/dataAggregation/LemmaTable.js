import { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTableData } from "../../store/slices/statsSlice";
import DownloadTableData from "../dataAggregation/downloadButtons/DownloadTableData";

const LemmaTable = () => {
  const dispatch = useDispatch();
  const [selectedBand, setSelectedBand] = useState(0);
  const bandFrequencyDict = useSelector(
    (state) => state.stats.bandFrequencyDict
  );

  const bands = Object.keys(bandFrequencyDict).map((band) => {
    const { colour } = bandFrequencyDict[band];
    return { name: band, colour };
  });

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

  // Create an array of bands with lemmas.
  let prevBand = -1;
  const bandsWithLemmas = bands.map((band) => {
    const lemmasInBand = [];
    for (const lemma in lemmaWordsDict) {
      const { rank, words } = lemmaWordsDict[lemma];
      const occurrences = lemmaFrequencyDict[lemma];
      if (band.name === "N/A" && rank === "N/A") {
        lemmasInBand.push({ lemma, words, rank, occurrences });
      } else if (rank <= parseInt(band.name) && rank > prevBand) {
        lemmasInBand.push({ lemma, words, rank, occurrences });
      }
    }

    // Sort lemmasInBand by rank.
    if (band.name !== "N/A") {
      lemmasInBand.sort((a, b) => a.rank - b.rank);
    }
    prevBand = parseInt(band.name);
    return { ...band, lemmas: lemmasInBand };
  });

  dispatch(setTableData(bandsWithLemmas));
  prevBand = 0;

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
                    href="#!"
                    className={
                      "band " + (bandIndex === selectedBand && "activeBand")
                    }
                    onClick={() => {
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
