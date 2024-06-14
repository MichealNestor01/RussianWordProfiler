import { createSlice } from "@reduxjs/toolkit";

// by default have 11 colours selected for readability
const colours = [
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

// const initialState = [];
const initialState = [];
for (let i = 0; i < 10; i++) {
  initialState[i] = {
    next: i + 1,
    prev: i - 1,
    bottomVal: 1000 * i + 1,
    topVal: 1000 * (i + 1),
    colour: colours[i],
    active: true,
  };
}

initialState[10] = {
  prev: 9,
  next: -1,
  bottomVal: 10001,
  topVal: 52047,
  colour: colours[10],
  active: true,
};

const storedState = localStorage.getItem("russianWordProfilerBandsV2")
  ? JSON.parse(localStorage.getItem("russianWordProfilerBandsV2"))
  : initialState;

/**
 * Redux slice for managing frequency bands, including their colors, values, and active states.
 *
 * @namespace ReduxStoreFrequencyBandsSlice
 */
Slice = createSlice({
  name: "bands",
  initialState: { bands: storedState },
  reducers: {
    /**
     * Changes the color of a specified band.
     * @memberof ReduxStoreFrequencyBandsSlice
     *
     * @param {Object} action - The action object containing payload with target band and new color.
     *
     * @example
     * dispatch(changeColour({ target: 1, colour: '#000000' }));
     */
    changeColour: (state, action) => {
      state.bands[action.payload.target].colour = action.payload.colour;
    },

    /**
     * Changes the top value of a specified band and adjusts the bottom value of the next band.
     * @memberof ReduxStoreFrequencyBandsSlice
     *
     * @param {Object} action - The action object containing payload with target band and new top value.
     *
     * @example
     * dispatch(changeTopVal({ target: 2, newVal: 2000 }));
     */
    changeTopVal: (state, action) => {
      const { target, newVal } = action.payload;
      const next = state.bands[target].next;

      state.bands[target].topVal = parseInt(newVal);

      if (next !== -1) {
        state.bands[next].bottomVal = parseInt(newVal) + 1;
      }
    },

    /**
     * Changes the bottom value of a specified band and adjusts the top value of the previous band.
     * @memberof ReduxStoreFrequencyBandsSlice
     *
     * @param {Object} action - The action object containing payload with target band and new bottom value.
     *
     * @example
     * dispatch(changeBottomVal({ target: 3, newVal: 3000 }));
     */
    changeBottomVal: (state, action) => {
      const { target, newVal } = action.payload;
      const prev = state.bands[target].prev;

      state.bands[target].bottomVal = parseInt(newVal);

      if (prev !== -1) {
        state.bands[prev].topVal = parseInt(newVal) - 1;
      }
    },

    /**
     * Removes a specified band and adjusts the pointers of adjacent bands.
     * @memberof ReduxStoreFrequencyBandsSlice
     *
     * @param {Object} action - The action object containing payload with the target band to be removed.
     *
     * @example
     * dispatch(removeBand(4));
     */
    removeBand: (state, action) => {
      if (!(action.payload in state.bands)) {
        return state.bands;
      }

      const bandToRemove = state.bands[action.payload];

      if (bandToRemove.prev !== -1) {
        const prevBand = state.bands[bandToRemove.prev];
        prevBand.next = bandToRemove.next;
        prevBand.topVal = bandToRemove.topVal;

        if (bandToRemove.next !== -1) {
          state.bands[bandToRemove.next].prev = bandToRemove.prev;
        }
      } else if (bandToRemove.next !== -1) {
        const nextBand = state.bands[bandToRemove.next];
        nextBand.bottomVal = bandToRemove.bottomVal;
        nextBand.prev = -1;
      }

      const bandsCopy = {};
      Object.keys(state.bands).forEach((band) => {
        if (band !== action.payload) {
          bandsCopy[band] = { ...state.bands[band] };
        }
      });

      state.bands = { ...bandsCopy };
    },

    /**
     * Toggles the active state of a specified band.
     *
     * @param {Object} action - The action object containing payload with the target band.
     *
     * @example
     * dispatch(toggleActive(5));
     */
    toggleActive: (state, action) => {
      state.bands[action.payload].active = !state.bands[action.payload].active;
    },

    /**
     * Adds a new band to the state.
     * @memberof ReduxStoreFrequencyBandsSlice
     *
     * @example
     * dispatch(addBand());
     */
    addBand: (state) => {
      let maxId = -1;
      if (Object.keys(state.bands).length > 0) {
        maxId = Math.max(...Object.keys(state.bands).map(Number));
      }

      if (maxId !== -1) {
        state.bands[maxId + 1] = {
          prev: maxId,
          next: -1,
          bottomVal: state.bands[maxId].topVal + 1,
          topVal: state.bands[maxId].topVal + 2,
          colour: colours[maxId < 10 ? maxId + 1 : 10],
          active: true,
        };
        state.bands[maxId].next = maxId + 1;
      } else {
        state.bands[0] = {
          prev: -1,
          next: -1,
          bottomVal: 1,
          topVal: 52047,
          colour: colours[0],
          active: true,
        };
      }
    },

    /**
     * Adds a new band to the state.
     * @memberof ReduxStoreFrequencyBandsSlice
     *
     * @example
     * dispatch(addBand());
     */
    saveBands: (state) => {
      localStorage.setItem(
        "russianWordProfilerBandsV2",
        JSON.stringify(state.bands)
      );
    },
  },
});

export const {
  changeColour,
  changeTopVal,
  changeBottomVal,
  removeBand,
  addBand,
  saveBands,
  toggleActive,
} = frequencyBandsSlice.actions;

export default frequencyBandsSlice.reducer;
