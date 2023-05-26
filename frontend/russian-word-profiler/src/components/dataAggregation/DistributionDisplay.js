import { useSelector } from "react-redux";

const DistributionDisplay = () => {
  const bands = useSelector((state) => state.stats.bands);
  const totals = bands.map((band) => band.total);
  const maxTotal = Math.max(...totals);
  const sumTotal = [...totals].reduce((a, b) => a + b, 0);
  let prevBand = 0;
  console.log(bands);
  return (
    <div className="distributionContainer card">
      <h1>Word Frequency Distrbition</h1>
      <div className="barGraph">
        {bands.length === 0 && <h1 className="noData">profile some text to see data</h1>}
        {bands.map((band, index) => {
          const bar = (
            <div className="bandBarContainer">
              <h1 className="title">
                {prevBand === 0 ? "Top " : `${parseInt(prevBand) + 1} - `}
                {band.name}
              </h1>
              <div
                className="bandBar"
                key={`bandBar${index}`}
                style={{ width: `${(40 * band.total) / maxTotal}%`, background: band.colour }}
              />
              <h1 className="coverage">{parseFloat(((100 * band.total) / sumTotal).toFixed(1))}%</h1>
            </div>
          );
          prevBand = band.name;
          return band.total > 0 && bar;
        })}
      </div>
    </div>
  );
};

export default DistributionDisplay;
