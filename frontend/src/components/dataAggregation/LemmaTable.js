import { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import DownloadButton from "../generic/DownloadButton";

/**
 * @description
 * Component for displaying lemma table data.
 *
 * ### Redux Store Interaction
 * The component uses the following parts of the Redux store:
 * - `statsSlice.lemmaFrequencyDict`: Frequency dictionary for lemmas.
 *
 * @component
 *
 * @example
 * return (
 *   <LemmaTable />
 * )
 */
const LemmaTable = () => {
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
    return { name: band, colour, active, bottomVal, lemmas: [] };
  });

  for (const lemma in lemmaWordsDict) {
    const { rank, words } = lemmaWordsDict[lemma];
    let putInNa = true;
    if (lemma in lemmaFrequencyDict) {
      const occurrences = lemmaFrequencyDict[lemma];
      for (const band in bands) {
        if (bands[band].active) {
          if (bands[band].name === "N/A" && rank === "N/A") {
            bands[band].lemmas.push({ lemma, words, rank, occurrences });
            putInNa = false;
          } else if (
            rank <= parseInt(bands[band].name) &&
            rank >= bands[band].bottomVal
          ) {
            bands[band].lemmas.push({ lemma, words, rank, occurrences });
            putInNa = false;
          }
        }
      }
    }
    if (putInNa && bands.length) {
      bands[bands.length - 1].lemmas.push({
        lemma,
        words,
        rank,
        occurrences: 0,
      });
    }
  }

  const xlsData = [];
  bands.forEach((band) => {
    if (band.active) {
      band.lemmas.forEach((lemma) => {
        xlsData.push({
          BAND: band.name,
          LEMMA: lemma.lemma,
          WORDS: lemma.words.join(" "),
          OCCURRENCES: lemma.occurrences,
          RANK: lemma.rank,
        });
      });
    }
  });

  return (
    <Fragment>
      <div className="lemmaFull card">
        <div className="cardHeader">
          <h1 className="title">
            Frequency Lemma Table{" "}
            <DownloadButton
              data={xlsData}
              filename="profilerTableData"
              text="Download Table as CSV"
            />
          </h1>
          <div className="activeBandContainer">
            <div className="bands">
              {bands.map((band, bandIndex) => {
                if (band.active) {
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
                        width: 100 / bands.length + "%",
                        color:
                          bandIndex === selectedBand &&
                          bands[selectedBand]?.colour,
                        textDecoration: "none",
                      }}
                    >
                      {band.name}
                    </a>
                  );
                }
                return <Fragment />;
              })}
            </div>
            <div
              className="activeBandSelector"
              style={{
                marginLeft: (100 / bands.length) * selectedBand + "%",
                width: 100 / bands.length + "%",
                backgroundColor: bands[selectedBand]?.colour,
              }}
            ></div>
          </div>
        </div>
        {bands[selectedBand] ? (
          <div className="lemmaTable">
            <div className="bandHeaders">
              <p>Lemma</p>
              <p>Matching Words</p>
              <p>Occurrences</p>
              <p>Rank</p>
            </div>

            <div className="bandBody">
              {bands[selectedBand]?.lemmas.map((lemmaObj, lemmaIndex) => {
                return (
                  <div className="bandRow">
                    <p>{lemmaObj.lemma}</p>
                    <p>{lemmaObj.words.join(", ")}</p>
                    <p>{lemmaObj.occurrences}</p>
                    <p>{lemmaObj.rank}</p>
                  </div>
                );
              })}
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
