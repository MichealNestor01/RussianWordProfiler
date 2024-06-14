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
 * Redux slice for managing statistics-related state, including bands, table data, coverage data, distribution data, and frequency dictionaries.
 *
 * @namespace ReduxStorestatsSlice
 */
export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    /**
     * Resets the `bands` array to an empty array.
     * @memberof ReduxStorestatsSlice
     *
     * @param {Object} state - The current state of the Redux store, provided automatically.
     * @param {Object} action - The action object containing the reset action.
     *
     * @example
     * dispatch(reset());
     */
    reset: (state) => {
      state.bands = [];
    },

    /**
     * Sets the band frequency dictionary.
     * @memberof ReduxStorestatsSlice
     *
     * @param {Object} state - The current state of the Redux store, provided automatically.
     * @param {Object} action - The action object containing payload with the new band frequency dictionary.
     *
     * @example
     * dispatch(setBandFrequencyDict({ band1: 100, band2: 200 }));
     */
    setBandFrequencyDict: (state, action) => {
      state.bandFrequencyDict = action.payload;
    },

    /**
     * Sets the table data.
     * @memberof ReduxStorestatsSlice
     *
     * @param {Object} state - The current state of the Redux store, provided automatically.
     * @param {Object} action - The action object containing payload with the new table data.
     *
     * @example
     * dispatch(setTableData({ key: 'value' }));
     */
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },

    /**
     * Sets the coverage data.
     * @memberof ReduxStorestatsSlice
     *
     * @param {Object} state - The current state of the Redux store, provided automatically.
     * @param {Object} action - The action object containing payload with the new coverage data.
     *
     * @example
     * dispatch(setCoverageData([1, 2, 3, 4]));
     */
    setCoverageData: (state, action) => {
      state.coverageData = action.payload;
    },

    /**
     * Sets the distribution data.
     * @memberof ReduxStorestatsSlice
     *
     * @param {Object} state - The current state of the Redux store, provided automatically.
     * @param {Object} action - The action object containing payload with the new distribution data.
     *
     * @example
     * dispatch(setDistributionData([5, 10, 15, 20]));
     */
    setDistributionData: (state, action) => {
      state.distributionData = action.payload;
    },

    /**
     * Sets the lemma frequency dictionary.
     * @memberof ReduxStorestatsSlice
     *
     * @param {Object} state - The current state of the Redux store, provided automatically.
     * @param {Object} action - The action object containing payload with the new lemma frequency dictionary.
     *
     * @example
     * dispatch(setLemmaFrequencyDict({ lemma1: 50, lemma2: 75 }));
     */
    setLemmaFrequencyDict: (state, action) => {
      state.lemmaFrequencyDict = action.payload;
    },

    /**
     * Sets the not in list data.
     * @memberof ReduxStorestatsSlice
     *
     * @param {Object} state - The current state of the Redux store, provided automatically.
     * @param {Object} action - The action object containing payload with the new not in list data.
     *
     * @example
     * dispatch(setNotInList(['word1', 'word2']));
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
