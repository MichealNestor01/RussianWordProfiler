import { useEffect } from "react";
import background from "./assets/background.png";
import MainEditor from "./components/main/MainEditor";
import DistributionDisplay from "./components/dataAggregation/DistributionDisplay";
import CoverageDisplay from "./components/dataAggregation/CoverageDisplay";
import LemmaTable from "./components/dataAggregation/LemmaTable";

//const apiURL = "russian-word-profiler-api.fseggvhtdefnbdez.uksouth.azurecontainer.io:5000";
let initial = true;
function App() {
  useEffect(() => {
    if (initial) {
      alert(
        "This project is still new and may have a few bugs, non-standard displays are not yet supported, if you do find some wierd behaviour please report them to michealnestor@outlook.com"
      );
    }
    initial = false;
  }, []);

  return (
    <div className="page-wrapper">
      <div className="title-container">
        <h1 className="title">Russian Word Profiler</h1>
        <div className="button-container">
          {/* <button onClick={saveConfig}>Save Band Configuration</button> */}
          {/* <button onClick={resetDefault}>Reset Band Configuration</button> */}
        </div>
      </div>

      <section className="input-section">
        <MainEditor placeholder="Place text here!" />
      </section>
      <section className="bottom-panel">
        <section className="data-grid">
          <div className="top-panel">
            <DistributionDisplay />
            <CoverageDisplay />
          </div>
          <LemmaTable />
          <a href="https://tech.yandex.com/dictionary/" target="_blank">
            Powered by Yandex.Dictionary
          </a>
        </section>
      </section>
      {/* This is a background splash image */}
      <div className="image-container">
        <img src={background} alt="background splash" className="image" />
      </div>
    </div>
  );
}

export default App;
