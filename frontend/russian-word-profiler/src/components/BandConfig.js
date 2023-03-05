import { Fragment, useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { motion, AnimatePresence } from "framer-motion";
import Band from "./Band";

const BandConfig = ({ bands, setBands }) => {
  const [show, setShow] = useState(false);

  const generateBands = () => {
    return bands.map((band, index) => {
      console.log(band);
      const top = index === 0;
      return (
        <div className="bandInput">
          <Band
            key={band.id}
            id={band.id}
            startColour={band.colour}
            change={setBands}
            total={bands.length}
          />
          {top ? (
            <div>
              Top
              <input
                type="number"
                min="0"
                max="60000"
                value={bands[index].top}
                onChange={(e) => {
                  setBands({ type: "change_top", target: index, top: e.target.value });
                }}
              />
            </div>
          ) : (
            <div>
              <input
                type="number"
                min="0"
                max="60000"
                value={bands[index - 1].top}
                onChange={(e) => {
                  setBands({ type: "change_top", target: index - 1, top: e.target.value });
                }}
              />{" "}
              to
              <input
                type="number"
                min={bands[index - 1].top}
                max="60000"
                value={bands[index].top}
                onChange={(e) => {
                  setBands({ type: "change_top", target: index, top: e.target.value });
                }}
              />
            </div>
          )}
        </div>
      );
    });
  };

  let bandInputs = generateBands();
  useEffect(() => {
    bandInputs = generateBands();
  }, [bands]);

  const panel = (
    <motion.div
      initial={{ opacity: 0, y: "-50%", x: "-100%" }}
      animate={{ opacity: 1, y: "-100%", x: "-100%" }}
      exit={{ opacity: 0, y: "-50%", x: "-100%" }}
      transition={{ duration: 0.2 }}
      className="panel card"
    >
      <div className="top">
        <h2>Band Configuration</h2>
        <div className="closeButton" onClick={() => setShow(false)}>
          x
        </div>
      </div>
      <div className="bandsForm">
        Bands:
        {bandInputs}
      </div>
    </motion.div>
  );

  return (
    <div className="bandConfig">
      <h3
        onClick={() => {
          setShow(!show);
        }}
      >
        Configure Bands
      </h3>
      <AnimatePresence>{show && panel}</AnimatePresence>
    </div>
  );
};

export default BandConfig;
