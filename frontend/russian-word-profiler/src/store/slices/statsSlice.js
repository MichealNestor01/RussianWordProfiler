import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bands: [],
  tableData: {},
  bandFrequencyDict: {},
  lemmaMatchData: {},
  lemmaFrequencyDict: {},
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
        state.bands.push({ name: id, colour: colour, total: 0 });
        state.bands.sort((a, b) => a.name - b.name);
      }
    },
    reset: (state) => {
      state.bands = [];
    },
    setBandFrequencyDict: (state, action) => {
      state.bandFrequencyDict = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setLemmaMatchData: (state, action) => {
      state.lemmaMatchData = action.payload;
    },
    setLemmaFrequencyDict: (state, action) => {
      state.lemmaFrequencyDict = action.payload;
    },
    setNotInList: (state, action) => {
      state.notInList = action.payload;
    },
  },
});

export const {
  incrementBand,
  reset,
  setTableData,
  setLemmaMatchData,
  setLemmaFrequencyDict,
  setBandFrequencyDict,
} = statsSlice.actions;

export default statsSlice.reducer;
