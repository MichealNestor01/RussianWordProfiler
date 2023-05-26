import { createSlice } from "@reduxjs/toolkit";

// by default have 11 colours selected for readability
const colors = [
  "#e6194b",
  "#f58231",
  "#D7BF17",
  "#98C41D",
  "#3cb44b",
  "#42d4f4",
  "#4363d8",
  "#911eb4",
  "#f032e6",
  "#fabebe",
  "#aa6e28",
];

const initialState = [];
for (let i = 0; i < 10; i++) {
  initialState.push({
    id: i,
    top: 1000 * (i + 1),
    colour: colors[i],
  });
}

initialState.push({
  id: 10,
  top: 60000,
  colour: colors[10], // You can change this to any color you want.
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
