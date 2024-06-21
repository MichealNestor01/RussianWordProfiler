import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import BandConfigPanel from "../dialogueBoxes/BandConfig/BandConfigPanel";
import { setWordData } from "../../store/slices/textSlice";
import ApiSettings from "../dialogueBoxes/ApiSettings/ApiSettings";
import { toggleActive } from "../../store/slices/frequencyBandsSlice";
import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

/**
 * @description
 * Component for displaying and configuring the bands bar, which includes options for configuring bands and API settings, as well as profiling the text.
 *
 * ### Redux Store Interaction
 * The component uses the following parts of the Redux store:
 * - `bandsSlice.bands`: An array of band objects.
 * - `text.words`: The words to be profiled.
 * - `text.stopWords`: The stop words to be excluded from profiling.
 *
 * The component dispatches the following Redux actions:
 * - `setWordData`: Action to set the word data based on the profiling response.
 * - `toggleActive`: Action to toggle the active state of a band.
 *
 * ### API Interaction
 * The component interacts with the API as follows:
 * - `submitHandler`: Sends a POST request to the `/scantext/` endpoint with the text and optional stop words.
 *   - If the response status is 200, it dispatches `setWordData` with the received data.
 *   - If the response status is not 200, it logs an error message.
 *
 * @component
 *
 * @example
 * return (
 *   <BandsBar />
 * )
 */
const BandsBar = () => {
  const dispatch = useDispatch();
  const bands = useSelector((state) => state.bandsSlice.bands);
  const { words, stopWords } = useSelector((state) => state.text);
  const [showBandConfig, setShowBandConfig] = useState(false);
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [waitingResponse, setWaitingResponse] = useState(false);

  const submitHandler = async () => {
    setWaitingResponse(true);
    const url =
      window.location.href === "http://localhost:3000/" ||
      window.location.href === "http://localhost:5000/"
        ? "http://127.0.0.1:5000/"
        : "https://russianwordprofiler.pythonanywhere.com/";
    const response = await axios({
      method: "post",
      url: `${url}scantext/`,
      data: {
        stopwords: stopWords.map((word) => word.toLowerCase()),
        text: words,
      },
    });
    setWaitingResponse(false);
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
        {!waitingResponse && (
          <button onClick={submitHandler}>Profile Text</button>
        )}
        <BeatLoader
          className="spinner"
          color="#9593ff"
          loading={waitingResponse}
          aria-label="Loading Spinner"
        />
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
