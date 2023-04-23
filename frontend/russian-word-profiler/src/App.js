import background from "./assets/background.png";
import CustomBarChart from "./components/CustomBarChart";
import MainEditor from "./components/MainEditor";

//const apiURL = "russian-word-profiler-api.fseggvhtdefnbdez.uksouth.azurecontainer.io:5000";

function App() {
  return (
    <div className="page-wrapper">
      <h1 className="title">Russian Word Profiler</h1>
      <section className="input-section">
        <h2>TEXT TO PROFILE:</h2>
        <MainEditor placeholder="Place text here!" />
      </section>
      <section className="bottom-panel">
        <section className="data-panel">
          <h2>DATA AGREGATION</h2>
          <div className="">
            <CustomBarChart />
          </div>
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
