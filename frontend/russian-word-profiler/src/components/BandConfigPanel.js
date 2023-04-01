import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Band from "./Band";
import { useSelector, useDispatch } from "react-redux";
import { changeTopValue, removeBand, addBand } from "../store/bandsSlice";
import { setShow, setActiveBandIndex } from "../store/bandsConfigSlice";

const BandConfigPanel = () => {
  const [bandInputDivs, setBandInputDivs] = useState([]);
  const dispatch = useDispatch();
  const bands = useSelector((state) => state.bands);

  const createBandInputDivs = () => {
    return bands.map((band, index) => {
      const top = index === 0;
      return (
        <div className="bandInput" key={`bandInput-${index}`}>
          <Band id={band.id} startColour={band.colour} />
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

  useEffect(() => {
    setBandInputDivs(createBandInputDivs());
  }, [bands]);

  return (
    <motion.div
      initial={{ opacity: 0, y: "0%", x: "50%" }}
      animate={{ opacity: 1, y: "-20%", x: "50%" }}
      exit={{ opacity: 0, y: "0%", x: "50%" }}
      transition={{ duration: 0.2 }}
      className="panel card"
    >
      <div className="top">
        <h2>Band Configuration</h2>
        <div
          className="closeButton"
          onClick={() => {
            dispatch(setShow(false));
            dispatch(setActiveBandIndex(-1));
          }}
        >
          x
        </div>
      </div>
      <div className="bandsForm">
        Bands:
        {bandInputDivs}
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
