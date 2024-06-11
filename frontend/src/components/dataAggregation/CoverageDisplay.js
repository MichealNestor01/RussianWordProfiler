import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCoverageData } from "../../store/slices/statsSlice";
import BandBar from "../generic/BandBar";
import DownloadCoverageData from "../dataAggregation/downloadButtons/DownloadCoverageData";

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
  const sumTotal = [...totals].reduce((a, b) => a + b, 0);
  let currentTotal = 0;

  const coverageData = [];
  bands.forEach((band) => {
    currentTotal += band.total;
    coverageData.push({
      "BAND": band.name !== "N/A" ? band.name : "All",
      "COVERAGE": parseFloat(((100 * currentTotal) / sumTotal).toFixed(1)),
    });
  });

  dispatch(setCoverageData(coverageData));
  // reset to 0 for display
  currentTotal = 0;
  return (
    <div className="distributionContainer card">
      <div className="cardHeader">
        <h1 className="title">
          Cumulative Coverage <DownloadCoverageData />
        </h1>
      </div>
      <div className="barGraph">
        {bands.length === 0 ? (
          <div className="noDataMessage">No data to show</div>
        ) : (
          <Fragment>
            {bands.map((band, index) => {
              currentTotal += band.total;
              const subBars = [];
              for (let i = 0; i <= index; i++) {
                subBars.push(
                  <BandBar
                    index={index}
                    total={
                      bands.slice(0, i + 1).length > 0
                        ? bands
                            .slice(0, i + 1)
                            .reduce((sum, v) => sum + v.total, 0)
                        : 0
                    }
                    width={`${(70 * bands[i].total) / sumTotal}%`}
                    colour={bands[i].colour}
                  />
                );
              }
              const bar = (
                <div className="bandBarContainer">
                  <h1 className="title">
                    {band.name !== "N/A" ? `Top ${band.name}` : "All Words"}
                  </h1>
                  {subBars}
                  <h1 className="coverage">
                    {parseFloat(((100 * currentTotal) / sumTotal).toFixed(1))}%
                  </h1>
                </div>
              );
              return band.total > 0 && bar;
            })}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default DistributionDisplay;
