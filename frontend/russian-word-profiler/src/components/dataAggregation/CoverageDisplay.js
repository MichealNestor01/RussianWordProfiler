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
  const sumTotal = [...totals].reduce((a, b) => a + b, 0);
  let currentTotal = 0;
  return (
    <div className="distributionContainer card">
      <h1>Cumulative Coverage</h1>
      <div className="barGraph">
        {bands.length === 0 ? (
          <h1 className="noData">profile some text to see data</h1>
        ) : (
          <Fragment>
            {bands.map((band, index) => {
              currentTotal += band.total;
              const subBars = [];
              for (let i = 0; i <= index; i++) {
                subBars.push(
                  <div
                    className="bandBar"
                    key={`bandBar${index}-${i}`}
                    style={{
                      width: `${(70 * bands[i].total) / sumTotal}%`,
                      background: bands[i].colour,
                    }}
                  />
                );
              }
              const bar = (
                <div className="bandBarContainer">
                  <h1 className="title">{band.name !== "N/A" ? `Top ${band.name}` : "All Words"}</h1>
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
