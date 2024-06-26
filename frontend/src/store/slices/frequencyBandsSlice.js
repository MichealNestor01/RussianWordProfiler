import { createSlice } from "@reduxjs/toolkit";
import { getDatetimeString } from "../../functions/getDatetimeString";

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
const initialBandState = [];
for (let i = 0; i < 10; i++) {
  initialBandState[i] = {
    next: i + 1,
    prev: i - 1,
    bottomVal: 1000 * i + 1,
    topVal: 1000 * (i + 1),
    colour: colours[i],
    active: true,
  };
}

initialBandState[10] = {
  prev: 9,
  next: -1,
  bottomVal: 10001,
  topVal: 52047,
  colour: colours[10],
  active: true,
};

const storedBandState = localStorage.getItem("russianWordProfilerBandsV3")
  ? JSON.parse(localStorage.getItem("russianWordProfilerBandsV3"))
  : initialBandState;

const defaultPresets = [
  {
    isDefault: true,
    name: "Default",
    bands: initialBandState.map((band) => ({
      top: band.topVal,
      colour: band.colour,
    })),
  },
  {
    isDefault: true,
    name: "CERF levels",
    bands: [
      { top: 89, colour: "#389F23" },
      { top: 372, colour: "#008C48" },
      { top: 897, colour: "#C06040" },
      { top: 1894, colour: "#C80000" },
      { top: 3394, colour: "#1C2181" },
      { top: 5392, colour: "#52007A" },
    ],
  },
];

const storedPresetState = localStorage.getItem("russianWordProfilerPresetsV2")
  ? JSON.parse(localStorage.getItem("russianWordProfilerPresetsV2"))
  : defaultPresets;

/**
 * Redux slice for managing frequency bands, including their colors, values, and active states.
 *
 * @namespace ReduxStoreFrequencyBandsSlice
 */
export const frequencyBandsSlice = createSlice({
  name: "bands",
  initialState: { bands: storedBandState, presets: storedPresetState },
  reducers: {
    /**
     * Changes the color of a specified band.
     * @memberof ReduxStoreFrequencyBandsSlice
     *
     * @param {Object} state - The current state of the Redux store, provided automatically.
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
     * @param {Object} state - The current state of the Redux store, provided automatically.
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
     * @param {Object} state - The current state of the Redux store, provided automatically.
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
     * @param {Object} state - The current state of the Redux store, provided automatically.
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
     * @memberof ReduxStoreFrequencyBandsSlice
     *
     * @param {Object} state - The current state of the Redux store, provided automatically.
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
     * Loads the given preset
     * @memberof ReduxStoreFrequencyBandsSlice
     *
     * @param {Object} state - The current state of the Redux store, provided automatically.
     * @param {Object} action - The action object containing payload with the target preset name.
     *
     * @example
     * dispatch(loadPreset("Default"));
     */
    loadPreset: (state, action) => {
      let targetPreset = {};
      state.presets.forEach((preset) => {
        if (preset.name === action.payload) {
          targetPreset = preset;
        }
      });

      let prevTop = 1;
      state.bands = targetPreset.bands.map((band, index) => {
        console.log("adding new band, ", index);
        const newBand = {
          prev: index - 1,
          next: index === targetPreset.bands.length - 1 ? -1 : index + 1,
          bottomVal: prevTop,
          topVal: band.top,
          colour: band.colour,
          active: true,
        };
        prevTop = band.top;
        return newBand;
      });
    },

    /**
         * Adds a new preset to the list
         * @memberof ReduxStoreFrequencyBandsSlice
         *
         * @param {Object} state - The current state of the Redux store, provided automatically.
         * @param {Object} action - The action object containing payload with the preset object to add.
         *
         * @example
         * dispatch(addNewPreset({
                isDefault: false,
                name: "CERF levels",
                bands: [
                    { top: 89, colour: "#389F23" },
                    { top: 372, colour: "#008C48" },
                    { top: 897, colour: "#C06040" },
                    { top: 1894, colour: "#C80000" },
                    { top: 3394, colour: "#1C2181" },
                    { top: 5392, colour: "#52007A" },
                ],
            }));
         */
    addNewPreset: (state, action) => {
      const newPreset = action.payload;
      newPreset.isDefault = false;

      if (
        newPreset.name === "Save Current Preset" ||
        newPreset.name === "Upload New Preset"
      ) {
        newPreset.name = `${newPreset.name}-(copy at ${getDatetimeString()})`;
      }

      if (state.presets.map((preset) => preset.name).includes(newPreset.name)) {
        newPreset.name = `${newPreset.name}-(copy at ${getDatetimeString()})`;
      }
      state.presets.push(newPreset);
      frequencyBandsSlice.caseReducers.savePresets(state);
    },

    /**
     * Removes a preset from the list and local storage
     * @memberof ReduxStoreFrequencyBandsSlice
     *
     * @param {Object} state - The current state of the Redux store, provided automatically.
     * @param {Object} action - The action object containing payload with the preset object to delete.
     *
     * @example
     * dispatch(addNewPreset("Default"));
     */
    deletePreset: (state, action) => {
      state.presets = state.presets.filter(
        (preset) => preset.name !== action.payload
      );
      frequencyBandsSlice.caseReducers.savePresets(state);
    },

    /**
     * Saves the current bands to local storage
     * @memberof ReduxStoreFrequencyBandsSlice
     *
     * @param {Object} state - The current state of the Redux store, provided automatically.
     * @example
     * dispatch(saveBands());
     */
    saveBands: (state) => {
      localStorage.setItem(
        "russianWordProfilerBandsV2",
        JSON.stringify(state.bands)
      );
    },

    /**
     * Saves the current presets to local storage
     * @memberof ReduxStoreFrequencyBandsSlice
     *
     * @param {Object} state - The current state of the Redux store, provided automatically.
     * @example
     * dispatch(savePresets());
     */
    savePresets: (state) => {
      localStorage.setItem(
        "russianWordProfilerPresetsV1",
        JSON.stringify(state.presets)
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
  loadPreset,
  addNewPreset,
  savePresets,
  deletePreset,
} = frequencyBandsSlice.actions;

export default frequencyBandsSlice.reducer;
