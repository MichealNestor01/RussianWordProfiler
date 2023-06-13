import { useSelector } from "react-redux";
import DownloadButton from "../generic/DownlaodButton";

const DownloadData = () => {
  const lemmaData = useSelector((state) => state.stats.lemmaFrequencyDict);
  console.log(lemmaData);
  return (
    <div className="downloadData card">
      <h1>Download Data</h1>
      <div className="buttonsContainer">
        <DownloadButton
          data={lemmaData}
          filename="lemmaData.csv"
          text="Download Lemma Frequency Ranks"
        />
      </div>
    </div>
  );
};

export default DownloadData;
