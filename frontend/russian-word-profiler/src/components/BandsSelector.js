import { Fragment, useEffect } from "react";
import BandConfig from "./BandConfig";
import { useSelector } from "react-redux";

const BandsSelector = () => {
  const bands = useSelector((state) => state.bands);

  const createBandDivs = () => {
    return bands.map((band) => {
      return (
        <Fragment>
          <div className="bandColour" style={{ backgroundColor: band.colour }} />
          <h2>{band.top}</h2>
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
