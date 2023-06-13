import { useSelector } from "react-redux";
import DownloadButton from "../generic/DownlaodButton";

const DownloadData = () => {
  const tableData = useSelector((state) => state.stats.tableData);
  const CSVData = [["BAND", "LEMMA", "WORDS", "occurrences", "RANK"]];
  Object.keys(tableData).forEach((tableKey) => {
    const { name, lemmas } = tableData[tableKey];
    lemmas.forEach((lemmaObj) => {
      const { lemma, words, occurrences, rank } = lemmaObj;
      CSVData.push([name, lemma, words.join(" "), occurrences, rank]);
    });
  });
  const currentdate = new Date();
  const datetime =
    currentdate.getDate() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getFullYear() +
    " " +
    currentdate.getHours() +
    "-" +
    currentdate.getMinutes() +
    "-" +
    currentdate.getSeconds();

  return (
    <div className="downloadData card">
      <h1>Download Data</h1>
      <div className="buttonsContainer">
        <DownloadButton
          data={CSVData}
          filename={`profilerTableData${datetime}.csv`}
          text="Download Table as CSV"
        />
      </div>
    </div>
  );
};

export default DownloadData;
