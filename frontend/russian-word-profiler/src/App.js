import { useEffect } from "react";
import background from "./assets/background.png";
import MainEditor from "./components/main/MainEditor";
import DistributionDisplay from "./components/dataAggregation/DistributionDisplay";
import LemmaTable from "./components/dataAggregation/LemmaTable";

//const apiURL = "russian-word-profiler-api.fseggvhtdefnbdez.uksouth.azurecontainer.io:5000";
let initial = true;
function App() {
  useEffect(() => {
    if (initial) {
      alert(
        "This is a demo of a project that is very much in a pre-alpha state. There are many catastrophic bugs, you have been warned. If you do find some errors please report them to michealnestor@outlook.com"
      );
    }
    initial = false;
  }, []);

  return (
    <div className="page-wrapper">
      <h1 className="title">Russian Word Profiler</h1>
      <section className="input-section">
        <MainEditor placeholder="Place text here!" />
      </section>
      <section className="bottom-panel">
        <h2>DATA AGGREGATION</h2>
        <section className="data-grid">
          <DistributionDisplay />
          <LemmaTable />
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
