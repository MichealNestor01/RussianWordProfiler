import { useSelector } from "react-redux";
import DownloadButton from "../../generic/DownloadButton";

const DownloadTableData = () => {
  const tableData = useSelector((state) => state.stats.tableData);
  // const CSVData = [["BAND", "LEMMA", "WORDS", "OCCURRENCES", "RANK"]];

  // if (tableData.length > 0) {
  //   Object.keys(tableData).forEach((tableKey) => {
  //     const { name, lemmas } = tableData[tableKey];
  //     lemmas.forEach((lemmaObj) => {
  //       const { lemma, words, occurrences, rank } = lemmaObj;
  //       CSVData.push([name, lemma, words.join(" "), occurrences, rank]);
  //     });
  //   });
  // }

  const xlsData = [];
  tableData.forEach((band) => {
    band.lemmas.forEach((lemma) => {
      xlsData.push({"BAND": band.name, "LEMMA": lemma.lemma, "WORDS": lemma.words.join(" "), "OCCURRENCES": lemma.occurrences, "RANK": lemma.rank});
    });
  }); 

  return (
    <DownloadButton
      data={xlsData}
      filename="profilerTableData"
      text="Download Table as CSV"
    />
  );
};

export default DownloadTableData;
