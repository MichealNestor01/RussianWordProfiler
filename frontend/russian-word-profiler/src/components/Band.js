import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { changeColour } from "../store/bandsSlice";

const Band = ({ id, startColour, show, setShow }) => {
  const dispatch = useDispatch();
  const bands = useSelector((state) => state.bands);
  const [colour, setColour] = useState(startColour);

  const changeHandler = (c) => {
    setColour(c.hex);
    dispatch(changeColour({ target: id, colour: c.hex }));
  };

  useEffect(() => {
    if (bands[id].colour != colour) {
      setColour(bands[id].colour);
    }
  }, [bands]);

  return (
    <Fragment>
      <AnimatePresence>
        {show === id && (
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
          if (show === id) {
            setShow(-1);
          } else {
            setShow(id);
          }
        }}
      />
    </Fragment>
  );
};

export default Band;
