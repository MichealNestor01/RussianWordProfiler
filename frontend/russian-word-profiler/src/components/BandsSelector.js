import { useEffect, useState } from "react";
import BandConfig from "./BandConfig";
import { useSelector } from "react-redux";

const BandsSelector = () => {
  const [bandDivs, setBandDivs] = useState([]);
  const bands = useSelector((state) => state.bands);

  const createBandDivs = () => {
    return bands.map((band, index) => {
      return (
        <div className={`bandContainer ${index > 0 && "withBorder"}`} key={`band-${index}`}>
          <div className="bandColour" style={{ backgroundColor: band.colour }} />
          {index > 0 ? (
            <h5>
              {parseInt(bands[index - 1].top) + 1}-{band.top}
            </h5>
          ) : (
            <h5>Top {band.top}</h5>
          )}
        </div>
      );
    });
  };

  useEffect(() => {
    setBandDivs(createBandDivs());
  }, [bands]);

  return (
    <section className="bands-selector">
      {bandDivs}
      <BandConfig />
    </section>
  );
};

export default BandsSelector;
