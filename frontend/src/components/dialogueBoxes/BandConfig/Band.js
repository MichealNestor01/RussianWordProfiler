import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeColour,
  changeTopVal,
  changeBottomVal,
} from "../../../store/slices/frequencyBandsSlice";
import { XMarkIcon } from "@heroicons/react/24/solid";

import BandColour from "./BandColour";

const Band = ({id, colour, top, bottom, activeIndex, setActiveIndex}) => {

  const dispatch = useDispatch();

  return (
    <div className="band">
      <BandColour id={id} colour={colour} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      {/* <div className="bandColor" style={{backgroundColor: colour}}></div> */}
      <input type="number"  className="bandInput" value={bottom} onChange={(e) => {dispatch(changeBottomVal({target: id, newVal: e.target.value}))}}></input>
      <p className="bandTo">TO</p>
      <input type="number" className="bandInput" value={top} onChange={(e) => {dispatch(changeTopVal({target: id, newVal: e.target.value}))}} ></input>
      <button className="bandDelete" onClick={(e) => {dispatch(removeBand(id))}} viewBox="0 0 24 24">
        <XMarkIcon className="closeButtonIcon" />
      </button>
    </div>
  );
};

export default Band;
