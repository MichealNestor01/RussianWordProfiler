import { useSelector } from "react-redux";
import DownloadButton from "../../generic/DownloadButton";

/**
 * @description
 * Component for downloading distribution data.
 *
 * @component
 *
 * @example
 * return (
 *   <DownloadDistributionData />
 * )
 */
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
