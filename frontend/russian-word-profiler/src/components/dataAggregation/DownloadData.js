import { useSelector } from "react-redux";
import DownloadButton from "../generic/DownlaodButton";

const DownloadData = () => {
  const lemmaData = useSelector((state) => state.stats.lemmaMatchData);

  return (
    <div className="downloadData card">
      <h1>Download Data</h1>
      <DownloadButton data={lemmaData} filename="lemmaData.csv" text="Download Lemma Data" />
    </div>
  );
};

export default DownloadData;
