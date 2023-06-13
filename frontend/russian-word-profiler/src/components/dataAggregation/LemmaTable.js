import { useSelector, useDispatch } from "react-redux";
import { setTableData } from "../../store/slices/statsSlice";

const LemmaTable = () => {
  const dispatch = useDispatch();
  const bandFrequencyDict = useSelector((state) => state.stats.bandFrequencyDict);
  const bands = Object.keys(bandFrequencyDict).map((band) => {
    const { colour } = bandFrequencyDict[band];
    return { name: band, colour };
  });
  const lemmaFrequencyDict = useSelector((state) => state.stats.lemmaFrequencyDict);
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
      } else if (rank <= band.name && rank > prevBand) {
        lemmasInBand.push({ lemma, words, rank, occurrences });
      }
    }
    // Sort lemmasInBand by rank.
    if (band.name !== "N/A") {
      lemmasInBand.sort((a, b) => a.rank - b.rank);
    }
    prevBand = band.name;
    return { ...band, lemmas: lemmasInBand };
  });

  dispatch(setTableData(bandsWithLemmas));
  prevBand = 0;
  return (
    <div className="lemmaTable card">
      <h1>Lemma Frequency Table</h1>
      <table className="table">
        <thead>
          <tr style={{ backgroundColor: "gray" }}>
            <th style={{ width: "240px" }}>Band</th>
            <th>Lemma</th>
            <th>Matching Words</th>
            <th style={{ width: "160px" }}>occurrences</th>
            <th style={{ width: "160px" }}>Rank</th>
          </tr>
        </thead>
        <tbody>
          {bandsWithLemmas.map((band, bandIndex) => {
            const row = band.lemmas.map((lemmaObj, lemmaIndex) => (
              <tr
                key={bandIndex + "-" + lemmaIndex}
                style={{
                  backgroundColor: band.colour,
                  color: band.colour === "black" ? "white" : "black",
                  fontWeight: "bold",
                }}
              >
                {lemmaIndex === 0 && (
                  <td rowSpan={band.lemmas.length}>
                    {bandIndex === bandsWithLemmas.length - 1
                      ? "Not In List"
                      : bandIndex === 0
                      ? "Top "
                      : `${prevBand} - `}
                    {bandIndex !== bandsWithLemmas.length - 1 && band.name}
                  </td>
                )}
                <td>{lemmaObj.lemma}</td>
                <td>{lemmaObj.words.join(", ")}</td>
                <td>{lemmaObj.occurrences}</td>
                <td>{lemmaObj.rank}</td>
              </tr>
            ));
            prevBand = parseInt(band.name) + 1;
            return row;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LemmaTable;
