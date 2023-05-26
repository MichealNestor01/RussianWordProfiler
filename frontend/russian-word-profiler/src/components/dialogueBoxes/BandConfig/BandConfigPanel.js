import { useState } from "react";
import { motion } from "framer-motion";
import Band from "./Band";
import { useSelector, useDispatch } from "react-redux";
import { closeActiveDialogue } from "../../../store/siteStateSlice";
import { changeTopValue, removeBand, addBand } from "../../../store/frequencyBandsSlice";

const BandConfigPanel = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const dispatch = useDispatch();
  const bands = useSelector((state) => state.bands);

  const createBandInputDivs = () => {
    return bands.map((band, index) => {
      const top = index === 0;
      return (
        <div className="bandInput" key={`bandInput-${index}`}>
          <Band
            id={band.id}
            startColour={band.colour}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
          {top ? (
            <div className="gridItem">
              Top
              <input
                type="number"
                min="0"
                max="60000"
                value={bands[index].top}
                onChange={(e) => {
                  dispatch(changeTopValue({ target: index, top: e.target.value }));
                }}
              />
            </div>
          ) : (
            <div className="gridItem">
              <input
                type="number"
                min="0"
                max="60000"
                value={parseInt(bands[index - 1].top) + 1}
                onChange={(e) => {
                  dispatch(changeTopValue({ target: index - 1, top: e.target.value }));
                }}
              />
              to
              <input
                type="number"
                min={parseInt(bands[index - 1].top) + 1}
                max="60000"
                value={bands[index].top}
                onChange={(e) => {
                  dispatch(changeTopValue({ target: index, top: e.target.value }));
                }}
              />
            </div>
          )}
          <h2
            className="removeButton"
            onClick={() => {
              dispatch(removeBand(index));
            }}
          >
            x
          </h2>
        </div>
      );
    });
  };

  const panelHeight = 31 * bands.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: "0%", x: "350px" }}
      animate={{ opacity: 1, y: "-60px", x: "350px" }}
      exit={{ opacity: 0, y: "0%", x: "350px" }}
      transition={{ duration: 0.2 }}
      style={{ height: `${panelHeight + 160}px` }}
      className="panel card"
    >
      <div className="top">
        <h2>Band Configuration</h2>
        <div
          className="closeButton"
          onClick={() => {
            dispatch(closeActiveDialogue());
            setActiveIndex(-1);
          }}
        >
          x
        </div>
      </div>
      <div className="bandsForm">
        Bands:
        {createBandInputDivs()}
        <div
          onClick={() => {
            dispatch(addBand());
          }}
        >
          Add Band +
        </div>
      </div>
    </motion.div>
  );
};

export default BandConfigPanel;
