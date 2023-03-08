import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Band from "./Band";
import { useSelector, useDispatch } from "react-redux";
import { changeTopValue, removeBand, addBand } from "../store/bandsSlice";

const BandConfig = () => {
  const [show, setShow] = useState(false);
  const [bandShow, setBandShow] = useState(-1);
  const dispatch = useDispatch();
  const bands = useSelector((state) => state.bands);

  const generateBands = () => {
    return bands.map((band, index) => {
      const top = index === 0;
      return (
        <div className="bandInput">
          <Band
            key={band.id}
            id={band.id}
            startColour={band.colour}
            show={bandShow}
            setShow={setBandShow}
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
                value={bands[index - 1].top}
                onChange={(e) => {
                  dispatch(changeTopValue({ target: index - 1, top: e.target.value }));
                }}
              />
              to
              <input
                type="number"
                min={bands[index - 1].top}
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

  let bandInputs = generateBands();
  useEffect(() => {
    bandInputs = generateBands();
  }, [bands]);

  const panel = (
    <motion.div
      initial={{ opacity: 0, y: "-50%", x: "-120%" }}
      animate={{ opacity: 1, y: "-90%", x: "-120%" }}
      exit={{ opacity: 0, y: "-50%", x: "-120%" }}
      transition={{ duration: 0.2 }}
      className="panel card"
    >
      <div className="top">
        <h2>Band Configuration</h2>
        <div
          className="closeButton"
          onClick={() => {
            setShow(false);
            setBandShow(-1);
          }}
        >
          x
        </div>
      </div>
      <div className="bandsForm">
        Bands:
        {bandInputs}
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

  return (
    <div className="bandConfig">
      <h3
        onClick={() => {
          setShow(!show);
          setBandShow(-1);
        }}
      >
        Configure Bands
      </h3>
      <AnimatePresence>{show && panel}</AnimatePresence>
    </div>
  );
};

export default BandConfig;
