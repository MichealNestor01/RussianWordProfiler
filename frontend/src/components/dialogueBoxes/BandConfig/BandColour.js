import { useState, Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ChromePicker } from "react-color";
import { changeColour } from "../../../store/slices/frequencyBandsSlice";
import { AnimatePresence, motion } from "framer-motion";

const BandColour = ({ id, colour, activeIndex, setActiveIndex }) => {
  const [newColour, setColour] = useState(colour);
  const dispatch = useDispatch();

  const changeHandler = (c) => {
    setColour(c.hex);
    dispatch(changeColour({ target: id, colour: c.hex }));
  };

  useEffect(() => {
    console.log("ACTIVE:", activeIndex);
  }, [activeIndex]);

  return (
    <Fragment>
      <AnimatePresence>
        {activeIndex === id && (
          <motion.div
            initial={{ opacity: 0, y: `-0%`, x: `-120%` }}
            animate={{ opacity: 1, y: `-0%`, x: `-120%` }}
            exit={{ opacity: 0, y: `-0%`, x: `-120%` }}
            transition={{ duration: 0.2 }}
            className="colourSelector"
          >
            <ChromePicker
              className="picker"
              color={colour}
              onChange={(c) => changeHandler(c)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="bandColor"
        style={{ backgroundColor: colour }}
        onClick={() => {
          setActiveIndex(activeIndex === id ? -1 : id);
        }}
      ></div>
    </Fragment>
  );
};

export default BandColour;
