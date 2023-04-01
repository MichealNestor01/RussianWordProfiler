import { useEffect, useState } from "react";
import BandConfig from "./BandConfig";
import { useDispatch, useSelector } from "react-redux";
import BandConfigPanel from "./BandConfigPanel";
import { setActiveBandIndex, setShow } from "../store/bandsConfigSlice";
import { AnimatePresence } from "framer-motion";

const BandsSelector = () => {
  const [bandDivs, setBandDivs] = useState([]);
  const dispatch = useDispatch();
  const bands = useSelector((state) => state.bands);
  const show = useSelector((state) => state.config.show);

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
      <div className="scrollArea">{bandDivs}</div>
      <div className="bandConfig">
        <h3
          onClick={() => {
            dispatch(setShow(!show));
            dispatch(setActiveBandIndex(-1));
          }}
        >
          Configure Bands
        </h3>
      </div>
      <AnimatePresence>{show && <BandConfigPanel />}</AnimatePresence>
    </section>
  );
};

export default BandsSelector;
