import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import BandConfigPanel from "./BandConfigPanel";
import { setActiveBandIndex, setShow } from "../store/bandsConfigSlice";
import { setWordData, setShowApiConfig } from "../store/textSlice";
import { AnimatePresence } from "framer-motion";
import ApiSettings from "./ApiSettings";

const BandsSelector = () => {
  const [bandDivs, setBandDivs] = useState([]);
  const dispatch = useDispatch();
  const bands = useSelector((state) => state.bands);
  const showBandConfig = useSelector((state) => state.config.show);
  const showApiConfig = useSelector((state) => state.text.showApiConfig);
  const { text, stopwords } = useSelector((state) => state.text);

  const submitHandler = async () => {
    const response = await axios({
      method: "post",
      url: `http://localhost/scantext/`,
      data: { text: text, stopwords: stopwords },
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
      <div className="buttons">
        <button
          onClick={() => {
            dispatch(setShowApiConfig(!showApiConfig));
          }}
        >
          API Settings
        </button>
        <button onClick={submitHandler}>Profile Text</button>
        <button
          onClick={() => {
            dispatch(setShow(!showBandConfig));
            dispatch(setActiveBandIndex(-1));
          }}
        >
          Configure Bands
        </button>
      </div>
      <AnimatePresence>{showBandConfig && <BandConfigPanel />}</AnimatePresence>
      <AnimatePresence>{showApiConfig && <ApiSettings />}</AnimatePresence>
    </section>
  );
};

export default BandsSelector;
