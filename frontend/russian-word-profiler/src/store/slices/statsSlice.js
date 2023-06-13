import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bands: [],
  tableData: {},
  coverageData: [],
  bandFrequencyDict: {},
  lemmaFrequencyDict: {},
};

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    reset: (state) => {
      state.bands = [];
    },
    setBandFrequencyDict: (state, action) => {
      state.bandFrequencyDict = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setCoverageData: (state, action) => {
      state.coverageData = action.payload;
    },
    setLemmaFrequencyDict: (state, action) => {
      state.lemmaFrequencyDict = action.payload;
    },
    setNotInList: (state, action) => {
      state.notInList = action.payload;
    },
  },
});

export const { reset, setTableData, setCoverageData, setLemmaFrequencyDict, setBandFrequencyDict } =
  statsSlice.actions;

export default statsSlice.reducer;
