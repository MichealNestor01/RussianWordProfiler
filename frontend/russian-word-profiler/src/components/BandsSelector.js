import { Fragment, useState, useReducer, useEffect } from "react";
import { ChromePicker } from "react-color";
import Band from "./Band";
import BandConfig from "./BandConfig";

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
  const createBandDivs = () => {
    console.log("Create band divs from: ", colourBands);
    return colourBands.map((band) => {
      return (
        <Fragment>
          <div className="bandColour" style={{ backgroundColor: band.colour }} />
          <h2>{band.top}</h2>
        </Fragment>
      );
    });
  };

  let bandDivs = createBandDivs();

  useEffect(() => {
    bandDivs = createBandDivs();
  }, [colourBands]);

  return (
    <section className="bands-selector">
      {bandDivs}

      <BandConfig bands={colourBands} setBands={dispatchColourBands} />
    </section>
  );
};

export default BandsSelector;
