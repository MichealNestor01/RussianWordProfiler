import { useSelector } from "react-redux";
import DownloadButton from "../../generic/DownlaodButton";

const DownloadDistributionData = () => {
  // Get coverage data.
  const coverageData = useSelector((state) => state.stats.distributionData);

  return (
    <DownloadButton
      data={coverageData}
      filename="profilerDistributionData"
      text="Download Distribution Data"
    />
  );
};

export default DownloadDistributionData;
