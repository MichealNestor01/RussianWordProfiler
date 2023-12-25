import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import BandConfigPanel from "../dialogueBoxes/BandConfig/BandConfigPanel";
import { setActiveDialogue } from "../../store/slices/siteStateSlice";
import { setWordData } from "../../store/slices/textSlice";
import { AnimatePresence } from "framer-motion";
import ApiSettings from "../dialogueBoxes/ApiSettings/ApiSettings";
import {
  addSelectedBand,
  removeSelectedBand,
} from "../../store/slices/selectedBandSlice";

const BandsBar = () => {
  const dispatch = useDispatch();
  const bands = useSelector((state) => state.bands);
  const activeWindow = useSelector((state) => state.siteState.activeWindow);
  const { words, stopWords } = useSelector((state) => state.text);

  const selectedBands = useSelector(
    (state) => state.selectedBands.selectedBands
  );

  const submitHandler = async () => {
    const url =
      window.location.href === "http://localhost:3000/"
        ? "http://127.0.0.1:5000/" //"http://localhost/"
        : "http://michealnestor.pythonanywhere.com/";
    const response = await axios({
      method: "post",
      url: `${url}scantext/`,
      data:
        stopWords.length > 0
          ? { stopwords: stopWords, text: words }
          : { text: words },
    });
    if (response.status === 200) {
      console.log(response.data);
      dispatch(setWordData(response.data));
    } else {
      console.error(`ERROR CODE: ${response.status} - ${response.statusText}`);
    }
  };

  // Toggling the band adds it to the list of bands not to show on the formatted output.
  function toggleBand(band) {
    if (band.id in selectedBands) {
      dispatch(removeSelectedBand(band.id));
    } else {
      dispatch(addSelectedBand(band.id));
    }
  }

  const createBandDivs = () => {
    return bands.map((band, index) => {
      return (
        <div
          className={`bandContainer ${index > 0 && "withBorder"}`}
          key={`band-${index}`}
        >
          <div
            className="bandColour"
            style={{
              backgroundColor: !(band.id in selectedBands)
                ? band.colour
                : "transparent",
              borderColor:
                band.id in selectedBands ? band.colour : "transparent",
            }}
            onClick={() => toggleBand(band)}
          />
          {index > 0 ? <h5>{band.top}</h5> : <h5>Top {band.top}</h5>}
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
            dispatch(
              setActiveDialogue(activeWindow === "bands" ? "" : "bands")
            );
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
      <AnimatePresence>
        {activeWindow === "api" && <ApiSettings />}
      </AnimatePresence>
      <AnimatePresence>
        {activeWindow === "bands" && <BandConfigPanel />}
      </AnimatePresence>
    </section>
  );
};

export default BandsBar;
