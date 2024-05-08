import { useSelector } from "react-redux";
import DownloadButton from "../../generic/DownlaodButton";

const DownloadCoverageData = () => {
  // Get coverage data.
  const coverageData = useSelector((state) => state.stats.coverageData);

  return (
    <DownloadButton
      data={coverageData}
      filename="profilerCoverageData"
      text="Download Coverage Data"
    />
  );
};

export default DownloadCoverageData;
