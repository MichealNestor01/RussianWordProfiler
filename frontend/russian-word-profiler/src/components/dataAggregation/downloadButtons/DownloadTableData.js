import { useSelector } from "react-redux";
import DownloadButton from "../../generic/DownlaodButton";

const DownloadTableData = () => {
  // GET TABLE DATA
  const tableData = useSelector((state) => state.stats.tableData);
  const CSVData = [["BAND", "LEMMA", "WORDS", "OCCURRENCES", "RANK"]];

  if (tableData.length > 0) {
    Object.keys(tableData).forEach((tableKey) => {
      const { name, lemmas } = tableData[tableKey];
      lemmas.forEach((lemmaObj) => {
        const { lemma, words, occurrences, rank } = lemmaObj;
        CSVData.push([name, lemma, words.join(" "), occurrences, rank]);
      });
    });
  }

  return (
    <DownloadButton
      data={CSVData}
      filename="profilerTableData"
      text="Download Table as CSV"
    />
  );
};

export default DownloadTableData;
