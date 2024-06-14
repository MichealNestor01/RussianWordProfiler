import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bands: [],
  tableData: {},
  coverageData: [],
  distributionData: [],
  bandFrequencyDict: {},
  lemmaFrequencyDict: {},
};

/**
 * @description
 * Redux slice for managing statistics-related state, including bands, table data, coverage data, distribution data, and frequency dictionaries.
 *
 * ### Initial State
 * - `bands`: An array for storing band information.
 * - `tableData`: An object for storing table data.
 * - `coverageData`: An array for storing coverage data.
 * - `distributionData`: An array for storing distribution data.
 * - `bandFrequencyDict`: An object for storing the frequency of bands.
 * - `lemmaFrequencyDict`: An object for storing the frequency of lemmas.
 *
 * @example
 * import { useDispatch, useSelector } from 'react-redux';
 * import { setTableData, reset } from './statsSlice';
 *
 * const dispatch = useDispatch();
 * const stats = useSelector((state) => state.statsSlice);
 *
 * dispatch(setTableData({ key: 'value' }));
 * dispatch(reset());
 */
export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    /**
     * @description
     * Resets the `bands` array to an empty array.
     * @param {Object} state - The current state of the slice.
     */
    reset: (state) => {
      state.bands = [];
    },

    /**
     * @description
     * Sets the band frequency dictionary.
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object containing payload with the new band frequency dictionary.
     */
    setBandFrequencyDict: (state, action) => {
      state.bandFrequencyDict = action.payload;
    },

    /**
     * @description
     * Sets the table data.
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object containing payload with the new table data.
     */
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },

    /**
     * @description
     * Sets the coverage data.
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object containing payload with the new coverage data.
     */
    setCoverageData: (state, action) => {
      state.coverageData = action.payload;
    },

    /**
     * @description
     * Sets the distribution data.
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object containing payload with the new distribution data.
     */
    setDistributionData: (state, action) => {
      state.distributionData = action.payload;
    },

    /**
     * @description
     * Sets the lemma frequency dictionary.
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object containing payload with the new lemma frequency dictionary.
     */
    setLemmaFrequencyDict: (state, action) => {
      state.lemmaFrequencyDict = action.payload;
    },

    /**
     * @description
     * Sets the not in list data.
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object containing payload with the new not in list data.
     */
    setNotInList: (state, action) => {
      state.notInList = action.payload;
    },
  },
});

export const {
  reset,
  setTableData,
  setCoverageData,
  setDistributionData,
  setLemmaFrequencyDict,
  setBandFrequencyDict,
  setNotInList,
} = statsSlice.actions;

export default statsSlice.reducer;
