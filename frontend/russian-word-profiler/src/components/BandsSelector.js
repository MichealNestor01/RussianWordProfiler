import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import BandConfigPanel from "./BandConfigPanel";
import { setActiveBandIndex, setShow } from "../store/bandsConfigSlice";
import { setWordData } from "../store/textSlice";
import { AnimatePresence } from "framer-motion";

const BandsSelector = () => {
  const [bandDivs, setBandDivs] = useState([]);
  const dispatch = useDispatch();
  const bands = useSelector((state) => state.bands);
  const show = useSelector((state) => state.config.show);
  const text = useSelector((state) => state.text.text);

  const submitHandler = async () => {
    const response = await axios({
      method: "post",
      url: `http://localhost/scantext/`,
      data: { text: text },
    });
    if (response.status === 200) {
      console.log(response.data);
      dispatch(setWordData(response.data));
    } else {
      console.error(`ERROR CODE: ${response.status} - ${response.statusText}`);
    }
  };

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
        <button onClick={submitHandler}>Profile Text</button>
        <button
          onClick={() => {
            dispatch(setShow(!show));
            dispatch(setActiveBandIndex(-1));
          }}
        >
          Configure Bands
        </button>
      </div>
      <AnimatePresence>{show && <BandConfigPanel />}</AnimatePresence>
    </section>
  );
};

export default BandsSelector;
