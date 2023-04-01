import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { changeColour } from "../store/bandsSlice";
import { setActiveBandIndex } from "../store/bandsConfigSlice";

const Band = ({ id, startColour }) => {
  const [colour, setColour] = useState(startColour);
  const dispatch = useDispatch();
  const bands = useSelector((state) => state.bands);
  const activeBandIndex = useSelector((state) => state.config.activeBandIndex);

  const changeHandler = (c) => {
    setColour(c.hex);
    dispatch(changeColour({ target: id, colour: c.hex }));
  };

  useEffect(() => {
    console.log(`bands from ${id}: `, bands);
    if (id < bands.length) {
      if (bands[id].colour != colour) {
        setColour(bands[id].colour);
      }
    }
  }, [bands]);

  return (
    <Fragment>
      <AnimatePresence>
        {activeBandIndex === id && (
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
          if (activeBandIndex === id) {
            dispatch(setActiveBandIndex(-1));
          } else {
            dispatch(setActiveBandIndex(id));
          }
        }}
      />
    </Fragment>
  );
};

export default Band;
