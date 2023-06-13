import { useSelector } from "react-redux";
import DownloadButton from "../generic/DownlaodButton";

const DownloadData = () => {
  // GET TABLE DATA
  const tableData = useSelector((state) => state.stats.tableData);
  const CSVData = [["BAND", "LEMMA", "WORDS", "OCCURRENCES", "RANK"]];
  Object.keys(tableData).forEach((tableKey) => {
    const { name, lemmas } = tableData[tableKey];
    lemmas.forEach((lemmaObj) => {
      const { lemma, words, occurrences, rank } = lemmaObj;
      CSVData.push([name, lemma, words.join(" "), occurrences, rank]);
    });
  });
  // GET COVERAGE DATA
  const coverageData = useSelector((state) => state.stats.coverageData);
  // GET FREQUENCY DISTRUBUTION DATA
  const distributionData = useSelector((state) => state.stats.distributionData);

  return (
    <div className="downloadData card">
      <h1>Download Data</h1>
      <div className="buttonsContainer">
        <DownloadButton
          data={distributionData}
          filename="profilerBandDistributionData"
          text="Download Frequency Distribution Data as CSV"
        />
        <DownloadButton data={CSVData} filename="profilerTableData" text="Download Table as CSV" />
        <DownloadButton
          data={coverageData}
          filename="profilerCoverageData"
          text="Download Coverage Data as CSV"
        />
      </div>
    </div>
  );
};

export default DownloadData;
