import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import BandConfigPanel from "../dialogueBoxes/BandConfig/BandConfigPanel";
import { setWordData } from "../../store/slices/textSlice";
import ApiSettings from "../dialogueBoxes/ApiSettings/ApiSettings";
import { toggleActive } from "../../store/slices/frequencyBandsSlice";
import { useState } from "react";

const BandsBar = () => {
  const dispatch = useDispatch();
  const bands = useSelector((state) => state.bandsSlice.bands);
  const { words, stopWords } = useSelector((state) => state.text);
  const [showBandConfig, setShowBandConfig] = useState(false);
  const [showApiSettings, setShowApiSettings] = useState(false);

  const submitHandler = async () => {
    const url =
      window.location.href === "http://localhost:3000/" ||
      window.location.href === "http://localhost:5000/"
        ? "http://127.0.0.1:5000/"
        : "https://michealnestor.pythonanywhere.com/";
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

  const createBandDivs = () => {
    return Object.keys(bands).map((band, index) => {
      return (
        <div
          className={`bandContainer ${index > 0 && "withBorder"}`}
          key={`band-${index}`}
        >
          <div
            className="bandColour"
            style={{
              backgroundColor: bands[band].active
                ? bands[band].colour
                : "transparent",
              borderColor: bands[band].active
                ? "transparent"
                : bands[band].colour,
            }}
            onClick={() => dispatch(toggleActive(band))}
          />
          {index > 0 ? (
            <h5>{bands[band].topVal}</h5>
          ) : (
            <h5>Top {bands[band].topVal}</h5>
          )}
        </div>
      );
    });
  };

  return (
    <section className="bands-selector">
      <div className="scrollArea">{createBandDivs()}</div>
      <div className="buttons">
        <button onClick={() => setShowBandConfig(true)}>Configure Bands</button>
        <button onClick={() => setShowApiSettings(true)}>API Settings</button>
        <button onClick={submitHandler}>Profile Text</button>
      </div>
      <ApiSettings
        active={showApiSettings}
        onClose={() => setShowApiSettings(false)}
      />
      <BandConfigPanel
        active={showBandConfig}
        onClose={() => setShowBandConfig(false)}
      />
    </section>
  );
};

export default BandsBar;
