import { Fragment } from "react";
import { useSelector } from "react-redux";
import DownloadButton from "../generic/DownloadButton";
import BandBar from "../generic/BandBar";

/**
 * @description
 * Component for displaying distribution data.
 *
 * ### Redux Store Interaction
 * The component uses the following parts of the Redux store:
 * - `statsSlice.bandFrequencyDict`: Frequency dictionary for bands.
 *
 * @component
 *
 * @example
 * return (
 *   <DistributionDisplay />
 * )
 */

const DistributionDisplay = () => {
  const bandFrequencyDict = useSelector(
    (state) => state.stats.bandFrequencyDict
  );

  const totals = [];
  const bands = Object.keys(bandFrequencyDict).map((band) => {
    const { colour, total, bottomVal } = bandFrequencyDict[band];
    totals.push(total);
    return { name: band, colour, total, bottomVal };
  });
  const maxTotal = Math.max(...totals);
  const sumTotal = [...totals].reduce((a, b) => a + b, 0);

  // organise distribution data so it can be downloaded
  const distributionData = [];
  bands.forEach((band, index) => {
    distributionData.push({
      BAND:
        band.name !== "N/A"
          ? `${band.bottomVal !== 1 ? `${band.bottomVal} - ` : "Top "}${
              band.name
            }`
          : "Not in List",
      "PERCENTAGE COVERED": parseFloat(
        ((100 * band.total) / sumTotal).toFixed(1)
      ),
    });
  });

  let prevBand = 0;
  return (
    <div className="distributionContainer card">
      <div className="cardHeader">
        <h1 className="title">
          Word Frequency Distribution{" "}
          <DownloadButton
            data={distributionData}
            filename="profilerDistributionData"
            text="Download Distribution Data"
          />
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
                          band.bottomVal !== 1 ? `${band.bottomVal} - ` : "Top "
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
