import { Fragment, useState, useReducer } from "react";
import { ChromePicker } from "react-color";
import Band from "./Band";

/*
const colourBandReducer = (state, action) => {
  switch (action.type) {
    case "change_colour":
      const newState = { ...state };
      newState.map((band) => {
        if (band.top === action.target) {
          return { ...band, colour: action.colour };
        }
        return band;
      });
      return newState;
    default:
      return state;
  }
};
*/

const BandsSelector = ({ colourBands, dispatchColourBands }) => {
  /*
  const [colourBands, dispatchColourBands] = useReducer(colourBandReducer, [
    { id: 0, top: 1000, colour: "#FF0000" },
    { id: 1, top: 5000, colour: "#016B09" },
    { id: 2, top: 6000, colour: "#0804D4" },
    { id: 3, top: "rest", colour: "#F008D8" },
  ]);
  */
  console.log(colourBands);
  const bandDivs = colourBands.map((band) => {
    return (
      <Band
        key={band.id}
        id={band.id}
        startTop={band.top}
        startColour={band.colour}
        change={dispatchColourBands}
      />
    );
  });

  return <section className="bands-selector">{bandDivs}</section>;
};

export default BandsSelector;
