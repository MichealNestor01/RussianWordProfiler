import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bands: [],
};

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    incrementBand: (state, action) => {
      const { id, colour } = action.payload;
      let notFound = true;
      state.bands.forEach((band) => {
        if (band.name === id) {
          notFound = false;
          band.total++;
        }
      });
      if (notFound) {
        state.bands.push({ name: id, color: colour, total: 0 });
        state.bands.sort((a, b) => a.name - b.name);
      }
    },
    reset: (state) => {
      state.bands = [];
    },
  },
});

export const { incrementBand, reset } = statsSlice.actions;

export default statsSlice.reducer;
