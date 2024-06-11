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

const initialState = [];
for (let i = 0; i < 10; i++) {
  initialState.push({
    id: i,
    top: 1000 * (i + 1),
    bottom: 1000 * i + 1,
    colour: colours[i],
  });
}

initialState.push({
  id: 10,
  top: 52047,
  bottom: 1000 * (10) + 1,
  colour: colours[10],
  
});

const storedState = localStorage.getItem("russianWordProfilerBands")
  ? JSON.parse(localStorage.getItem("russianWordProfilerBands"))
  : initialState;

export const frequencyBandsSlice = createSlice({
  name: "bands",
  initialState: storedState,
  reducers: {
    changeColour: (state, action) => {
      state.forEach((band) => {
        if (band.id === action.payload.target) {
          band.colour = action.payload.colour;
        }
      });
    },
    changeTopValue: (state, action) => {
      for (let i = 0; i < state.length; i++) {
        let band = state[i];
        if (band.id == action.payload.target) {

          band.top = parseInt(action.payload.top);

          if (i + 1 < state.length) {
            state[i+1].bottom = band.top + 1;
          }
        }
      }
    },

    changeBottomValue: (state, action) => {
      for (let i = 0; i < state.length; i++) {
        let band = state[i];
        if (band.id == action.payload.target) {

          band.bottom = parseInt(action.payload.bottom);

          if (i - 1 >= 0) {
            state[i-1].top = band.bottom - 1 ;
          }
        }
      }
    },

    removeBand: (state, action) => {
      state.splice(action.payload, 1);
      //state.remove(action.payload.target);
      for (let id = action.payload; id < state.length; id++) {
        console.log(state[id].colour);
        state[id].id = id;
      }
      if (action.payload === state.length) {
        state[state.length - 1].top = 60000;
      }
    },
    addBand: (state) => {
      state.push({ id: state.length, top: 60000, colour: colours[10] });
    },
    saveBands: (state) => {
      localStorage.setItem("russianWordProfilerBands", JSON.stringify(state));
    },
    setDefaultBands: (state) => {
      state.length = 0;
      initialState.forEach((band) => {
        state.push(band);
      });
      localStorage.setItem("russianWordProfilerBands", JSON.stringify(initialState));
    },
  },
});

export const { changeColour, changeTopValue, changeBottomValue, removeBand, addBand, saveBands, setDefaultBands } =
  frequencyBandsSlice.actions;

export default frequencyBandsSlice.reducer;
