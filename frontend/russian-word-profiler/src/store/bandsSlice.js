import { createSlice } from "@reduxjs/toolkit";

export const bandsSlice = createSlice({
  name: "bands",
  initialState: [
    { id: 0, top: 1000, colour: "#FF0000" },
    { id: 1, top: 2500, colour: "#18b542" },
    { id: 2, top: 5000, colour: "#0804D4" },
    { id: 3, top: 60000, colour: "#588C9C" },
  ],
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
