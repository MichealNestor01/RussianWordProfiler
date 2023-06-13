import { Fragment } from "react";
import { useSelector } from "react-redux";

const DistributionDisplay = () => {
  const bandFrequencyDict = useSelector((state) => state.stats.bandFrequencyDict);
  const totals = [];
  const bands = Object.keys(bandFrequencyDict).map((band) => {
    const { colour, total } = bandFrequencyDict[band];
    totals.push(total);
    return { name: band, colour, total };
  });
  const maxTotal = Math.max(...totals);
  const sumTotal = [...totals].reduce((a, b) => a + b, 0);
  let prevBand = 0;
  return (
    <div className="distributionContainer card">
      <h1>Word Frequency Distrbition</h1>
      <div className="barGraph">
        {bands.length === 0 ? (
          <h1 className="noData">profile some text to see data</h1>
        ) : (
          <Fragment>
            {bands.map((band, index) => {
              const bar = (
                <div className="bandBarContainer">
                  <h1 className="title">
                    {band.name !== "N/A"
                      ? `${prevBand === 0 ? "Top " : `${parseInt(prevBand) + 1} - `}${band.name}`
                      : "Not in List"}
                  </h1>
                  <div
                    className="bandBar"
                    key={`bandBar${index}`}
                    style={{ width: `${(70 * band.total) / maxTotal}%`, background: band.colour }}
                  />
                  <h1 className="coverage">{parseFloat(((100 * band.total) / sumTotal).toFixed(1))}%</h1>
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
