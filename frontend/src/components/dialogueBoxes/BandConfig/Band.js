import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTopVal,
  changeBottomVal,
  removeBand,
} from "../../../store/slices/frequencyBandsSlice";
import { XMarkIcon } from "@heroicons/react/24/solid";

import BandColour from "./BandColour";

/**
 * @description
 * Component for configuring a single band.
 *
 * ### Redux Store Interaction
 * The component dispatches the following Redux actions:
 * - `changeBottomVal`: Action to change the bottom value of a band.
 * - `changeTopVal`: Action to change the top value of a band.
 * - `removeBand`: Action to remove a band.
 *
 * @component
 * @param {Object} props - The props for Band.
 * @param {number} props.id - The ID of the band.
 * @param {string} props.colour - The color of the band.
 * @param {number} props.top - The top value of the band.
 * @param {number} props.bottom - The bottom value of the band.
 * @param {number} props.activeIndex - The index of the active band.
 * @param {Function} props.setActiveIndex - Function to set the active band index.
 *
 * @example
 * const band = { id: 1, colour: 'red', top: 1000, bottom: 1 };
 * return (
 *   <Band
 *     id={band.id}
 *     colour={band.colour}
 *     top={band.top}
 *     bottom={band.bottom}
 *     activeIndex={0}
 *     setActiveIndex={() => {}}
 *   />
 * )
 */
const Band = ({ id, colour, top, bottom, activeIndex, setActiveIndex }) => {
  const dispatch = useDispatch();

  return (
    <div className="band">
      <BandColour
        id={id}
        colour={colour}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      {/* <div className="bandColor" style={{backgroundColor: colour}}></div> */}
      <input
        type="number"
        className="bandInput"
        value={bottom}
        onChange={(e) => {
          dispatch(changeBottomVal({ target: id, newVal: e.target.value }));
        }}
      ></input>
      <p className="bandTo">TO</p>
      <input
        type="number"
        className="bandInput"
        value={top}
        onChange={(e) => {
          dispatch(changeTopVal({ target: id, newVal: e.target.value }));
        }}
      ></input>
      <button
        className="bandDelete"
        onClick={(e) => {
          dispatch(removeBand(id));
        }}
        viewBox="0 0 24 24"
      >
        <XMarkIcon className="closeButtonIcon" />
      </button>
    </div>
  );
};

export default Band;
