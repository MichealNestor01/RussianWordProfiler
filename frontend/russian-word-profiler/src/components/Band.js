import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useState } from "react";
import { ChromePicker } from "react-color";

const Band = ({ id, startColour, change, total }) => {
  const [colour, setColour] = useState(startColour);
  const [showPicker, setShowPicker] = useState(false);

  const changeHandler = (c) => {
    setColour(c.hex);
    change({ type: "change_colour", target: id, colour: c.hex });
  };

  return (
    <Fragment>
      <AnimatePresence>
        {showPicker && (
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
        onClick={() => setShowPicker(!showPicker)}
      />
    </Fragment>
  );
};

export default Band;
