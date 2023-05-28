import { useSelector, useDispatch } from "react-redux";
import { setLemmaMatchData, setTableData } from "../../store/slices/statsSlice";

const LemmaTable = () => {
  const dispatch = useDispatch();
  const bands = useSelector((state) => state.stats.bands);
  const lemmaFrequencyDict = useSelector((state) => state.stats.lemmaFrequencyDict);
  const wordData = useSelector((state) => state.text.wordData);

  // Create a dictionary with lemma as key and an array of words as value.
  const lemmaWordsDict = {};
  for (const word in wordData) {
    const { lemma, rank } = wordData[word];
    if (rank !== -1) {
      // only consider words with a valid frequency rank
      if (!lemmaWordsDict[lemma]) {
        lemmaWordsDict[lemma] = { words: [], rank };
      }
      lemmaWordsDict[lemma].words.push(word);
    }
  }

  // this data is useful so store it so people can downlaod it
  const lemmaMatchData = [];
  for (const lemma in lemmaWordsDict) {
    const { rank, words } = lemmaWordsDict[lemma];
    lemmaMatchData.push({ lemma, words, rank });
  }
  dispatch(setLemmaMatchData(lemmaMatchData.sort((a, b) => a.rank - b.rank)));

  // Create an array of bands with lemmas.
  let prevBand = -1;
  const bandsWithLemmas = bands.map((band) => {
    const lemmasInBand = [];
    for (const lemma in lemmaWordsDict) {
      const { rank, words } = lemmaWordsDict[lemma];
      if (rank <= band.name && rank > prevBand) {
        lemmasInBand.push({ lemma, words, rank });
      }
    }
    // Sort lemmasInBand by rank.
    lemmasInBand.sort((a, b) => a.rank - b.rank);
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
            <th style={{ width: "120px" }}>Band</th>
            <th>Lemma</th>
            <th>Matching Words</th>
            <th style={{ width: "60px" }}>Occ</th>
            <th style={{ width: "60px" }}>Rank</th>
          </tr>
        </thead>
        <tbody>
          {bandsWithLemmas.map((band, bandIndex) => {
            console.log(band);
            const row = band.lemmas.map((lemmaObj, lemmaIndex) => (
              <tr key={bandIndex + "-" + lemmaIndex} style={{ backgroundColor: band.colour }}>
                {lemmaIndex === 0 && (
                  <td rowSpan={band.lemmas.length}>
                    {bandIndex === 0 ? "Top " : `${prevBand} - `}
                    {band.name}
                  </td>
                )}
                <td>{lemmaObj.lemma}</td>
                <td>{lemmaObj.words.join(", ")}</td>
                <td>{lemmaFrequencyDict[lemmaObj.lemma]}</td>
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
