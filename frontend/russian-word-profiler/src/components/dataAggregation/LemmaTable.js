import { useSelector } from "react-redux";

const LemmaTable = () => {
  const bands = useSelector((state) => state.stats.bands);
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

  console.log(bandsWithLemmas);

  return (
    <div className="lemmaTable card">
      <h1>Lemma Frequency Table</h1>
      <table className="table">
        <thead>
          <tr style={{ backgroundColor: "gray" }}>
            <th>Band</th>
            <th>Lemma</th>
            <th>Matching Words</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {bandsWithLemmas.map((band, bandIndex) => {
            console.log(band);
            return band.lemmas.map((lemmaObj, lemmaIndex) => (
              <tr key={bandIndex + "-" + lemmaIndex} style={{ backgroundColor: band.colour }}>
                {lemmaIndex === 0 && <td rowSpan={band.lemmas.length}>{band.name}</td>}
                <td>{lemmaObj.lemma}</td>
                <td>{lemmaObj.words.join(", ")}</td>
                <td>{lemmaObj.rank}</td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LemmaTable;
