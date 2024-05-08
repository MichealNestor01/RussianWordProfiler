import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDistributionData } from "../../store/slices/statsSlice";
import DownloadDistributionData from "./downloadButtons/DownloadDistributionData";
import BandBar from "../generic/BandBar";

const DistributionDisplay = () => {
  const dispatch = useDispatch();
  const bandFrequencyDict = useSelector(
    (state) => state.stats.bandFrequencyDict
  );
  const totals = [];
  const bands = Object.keys(bandFrequencyDict).map((band) => {
    const { colour, total } = bandFrequencyDict[band];
    totals.push(total);
    return { name: band, colour, total };
  });
  const maxTotal = Math.max(...totals);
  const sumTotal = [...totals].reduce((a, b) => a + b, 0);
  // distribution data to download:
  const distributionData = [["BAND", "PERCENTAGE COVERED"]];
  bands.forEach((band, index) => {
    distributionData.push([
      band.name !== "N/A"
        ? `${
            index !== 0 ? `${parseInt(bands[index - 1].name) + 1} - ` : "Top "
          }${band.name}`
        : "Not in List",
      parseFloat(((100 * band.total) / sumTotal).toFixed(1)),
    ]);
  });
  dispatch(setDistributionData(distributionData));
  let prevBand = 0;
  return (
    <div className="distributionContainer card">
      <div className="cardHeader">
        <h1 className="title">
          Word Frequency Distribution <DownloadDistributionData />
        </h1>
      </div>

      <div className="barGraph">
        {bands.length === 0 ? (
          <div className="noDataMessage">No data to show</div>
        ) : (
          <Fragment>
            {bands.map((band, index) => {
              const bar = (
                <div className="bandBarContainer">
                  <h1 className="title">
                    {band.name !== "N/A"
                      ? `${
                          prevBand === 0
                            ? "Top "
                            : `${parseInt(prevBand) + 1} - `
                        }${band.name}`
                      : "Not in List"}
                  </h1>
                  <BandBar
                    index={index}
                    total={band.total}
                    width={`${(70 * band.total) / maxTotal}%`}
                    colour={band.colour}
                  />
                  <h1 className="coverage">
                    {parseFloat(((100 * band.total) / sumTotal).toFixed(1))}%
                  </h1>
                </div>
              );
              prevBand = band.name;
              return band.total > 0 && bar;
            })}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default DistributionDisplay;
