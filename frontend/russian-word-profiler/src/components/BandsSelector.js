import { Fragment, useEffect } from "react";
import BandConfig from "./BandConfig";
import { useSelector } from "react-redux";

const BandsSelector = () => {
  const bands = useSelector((state) => state.bands);

  const createBandDivs = () => {
    return bands.map((band, index) => {
      return (
        <Fragment>
          <div className={`bandContainer ${index > 0 && "withBorder"}`}>
            <div className="bandColour" style={{ backgroundColor: band.colour }} />
            {index > 0 ? (
              <h5>
                {parseInt(bands[index - 1].top) + 1}-{band.top}
              </h5>
            ) : (
              <h5>Top {band.top}</h5>
            )}
          </div>
        </Fragment>
      );
    });
  };

  let bandDivs = createBandDivs();

  useEffect(() => {
    bandDivs = createBandDivs();
  }, [bands]);

  return (
    <section className="bands-selector">
      {bandDivs}
      <BandConfig />
    </section>
  );
};

export default BandsSelector;
