import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { changeColour } from "../../../store/slices/frequencyBandsSlice";

const Band = ({ id, startColour, activeIndex, setActiveIndex }) => {
  const [colour, setColour] = useState(startColour);
  const dispatch = useDispatch();
  const bands = useSelector((state) => state.bands);

  const changeHandler = (c) => {
    setColour(c.hex);
    dispatch(changeColour({ target: id, colour: c.hex }));
  };

  useEffect(() => {
    if (id < bands.length) {
      if (bands[id].colour != colour) {
        setColour(bands[id].colour);
      }
    }
  }, [bands]);

  useEffect(() => {
    console.log("activeIndexChanged ", activeIndex);
  }, [activeIndex]);

  return (
    <Fragment>
      <AnimatePresence>
        {activeIndex === id && (
          <motion.div
            initial={{ opacity: 0, y: `-80%`, x: `-120%` }}
            animate={{ opacity: 1, y: `-80%`, x: `-120%` }}
            exit={{ opacity: 0, y: `-80%`, x: `-120%` }}
            transition={{ duration: 0.2 }}
            className="colourSelector"
          >
            <ChromePicker className="picker" color={colour} onChange={(c) => changeHandler(c)} />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="bandColour"
        style={{ backgroundColor: colour }}
        onClick={() => {
          console.log(activeIndex);
          if (activeIndex === id) {
            setActiveIndex(-1);
          } else {
            setActiveIndex(id);
          }
        }}
      />
    </Fragment>
  );
};

export default Band;
