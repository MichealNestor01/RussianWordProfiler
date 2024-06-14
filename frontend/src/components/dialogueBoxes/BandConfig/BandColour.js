import { useState, Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ChromePicker } from "react-color";
import { changeColour } from "../../../store/slices/frequencyBandsSlice";
import { AnimatePresence, motion } from "framer-motion";

/**
 * @description
 * Component for selecting a band color.
 *
 * ### Redux Store Interaction
 * The component dispatches the following Redux actions:
 * - `changeColour`: Action to change the color of a band.
 *
 * ### Dependencies
 * This component depends on the `ChromePicker` component from the `react-color` library to provide a color picker interface.
 *
 * @component
 * @param {Object} props - The props for BandColour.
 * @param {number} props.id - The ID of the band.
 * @param {string} props.colour - The current color of the band.
 * @param {number} props.activeIndex - The index of the active band.
 * @param {Function} props.setActiveIndex - Function to set the active band index.
 *
 * @example
 * return (
 *   <BandColour id={1} colour="red" activeIndex={0} setActiveIndex={() => {}} />
 * )
 */
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
