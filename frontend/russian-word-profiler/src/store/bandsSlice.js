import { createSlice } from "@reduxjs/toolkit";
import chroma from "chroma-js";

const initialState = [];
let colour = chroma("#ff0000");
for (let i = 1; i <= 10; i++) {
  const hue = (i - 1) * 16.5;
  const color = chroma(hue, 0.5, 0.5, "hsl");
  const darkerColor = color.darken(-0.3);
  const pastelColor = darkerColor.saturate(-0.1);

  initialState.push({
    id: i - 1,
    top: 100 * i,
    colour: pastelColor.hex(),
  });
}
for (let i = 1; i <= 10; i++) {
  const hue = (i + 10 - 1) * 16.5;
  const color = chroma(hue, 0.5, 0.5, "hsl");
  const darkerColor = color.darken(-0.3);
  const pastelColor = darkerColor.saturate(-0.1);

  initialState.push({
    id: i + 10 - 1,
    top: 1000 * (i + 1),
    colour: pastelColor.hex(),
  });
}
initialState.push({
  id: 20,
  top: 60000,
  colour: chroma(10 * 33, 0.5, 0.5, "hsl")
    .darken(-0.3)
    .saturate(-0.1)
    .hex(),
});

console.log(initialState);

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

export const { changeColour, changeTopValue, removeBand, addBand } = bandsSlice.actions;

export default bandsSlice.reducer;
