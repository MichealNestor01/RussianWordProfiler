import { createSlice } from "@reduxjs/toolkit";

export const selectedBandSlice = createSlice({
  name: "selectedBands",
  initialState: {
    selectedBands: {},
  },
  reducers: {
    addSelectedBand: (state, action) => {
      state.selectedBands[action.payload] = true;
    },
    removeSelectedBand: (state, action) => {
      delete state.selectedBands[action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { removeSelectedBand, addSelectedBand } =
  selectedBandSlice.actions;

export default selectedBandSlice.reducer;
