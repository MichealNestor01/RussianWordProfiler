import { createSlice } from "@reduxjs/toolkit";
import chroma from "chroma-js";

let initialState = [];
let colour = chroma("#ff0000");
for (let i = 1; i <= 10; i++) {
  initialState.push({
    id: i - 1,
    top: 1000 * i,
    colour: colour.set("hsl.h", (i - 1) * 33).hex(),
  });
}
initialState.push({
  id: 10,
  top: 60000,
  colour: colour.set("hsl.h", 10 * 33).hex(),
});

export const bandsSlice = createSlice({
  name: "bands",
  initialState,
  reducers: {
    changeColour: (state, action) => {
      state.forEach((band) => {
        if (band.id === action.payload.target) {
          band.colour = action.payload.colour;
        }
      });
    },
    changeTopValue: (state, action) => {
      state.forEach((band) => {
        if (band.id === action.payload.target) {
          band.top = action.payload.top;
        }
      });
    },
    removeBand: (state, action) => {
      console.log(action);
      state.splice(action.payload, 1);
      //state.remove(action.payload.target);
      for (let id = action.payload; id < state.length; id++) {
        console.log(state[id].colour);
        state[id].id = id;
      }
    },
    addBand: (state) => {
      state.push({ id: state.length, top: 60000, colour: "#FF0000" });
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeColour, changeTopValue, removeBand, addBand } = bandsSlice.actions;

export default bandsSlice.reducer;
