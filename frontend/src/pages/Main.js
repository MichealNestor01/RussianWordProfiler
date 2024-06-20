import { Fragment } from "react";
import MainEditor from "../components/main/MainEditor";
import DistributionDisplay from "../components/dataAggregation/DistributionDisplay";
import CoverageDisplay from "../components/dataAggregation/CoverageDisplay";
import LemmaTable from "../components/dataAggregation/LemmaTable";

const Main = () => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default Main;
