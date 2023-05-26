import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import BandConfigPanel from "../dialogueBoxes/BandConfig/BandConfigPanel";
import { setActiveDialogue } from "../../store/slices/siteStateSlice";
import { setWordData } from "../../store/slices/textSlice";
import { AnimatePresence } from "framer-motion";
import ApiSettings from "../dialogueBoxes/ApiSettings/ApiSettings";

const BandsBar = () => {
  const dispatch = useDispatch();
  const bands = useSelector((state) => state.bands);
  const activeWindow = useSelector((state) => state.siteState.activeWindow);
  const { text, stopWords } = useSelector((state) => state.text);

  const submitHandler = async () => {
    const url =
      window.location.href === "http://localhost:3000/" ? "http://localhost/" : window.location.href;
    const response = await axios({
      method: "post",
      url: `${url}scantext/`,
      data: { stopwords: stopWords, text: text },
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

  return (
    <section className="bands-selector">
      <div className="scrollArea">{createBandDivs()}</div>
      <div className="buttons">
        <button
          onClick={() => {
            dispatch(setActiveDialogue(activeWindow === "bands" ? "" : "bands"));
          }}
        >
          Configure Bands
        </button>
        <button
          onClick={() => {
            dispatch(setActiveDialogue(activeWindow === "api" ? "" : "api"));
          }}
        >
          API Settings
        </button>
        <button onClick={submitHandler}>Profile Text</button>
      </div>
      <AnimatePresence>{activeWindow === "api" && <ApiSettings />}</AnimatePresence>
      <AnimatePresence>{activeWindow === "bands" && <BandConfigPanel />}</AnimatePresence>
    </section>
  );
};

export default BandsBar;
