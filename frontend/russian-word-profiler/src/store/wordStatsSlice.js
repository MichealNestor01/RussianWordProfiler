import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  activeWordIndex: -1,
  activeWord: "",
  colour: "black",
  synonyms: [],
};

export const wordStatsSlice = createSlice({
  name: "wordStats",
  initialState,
  reducers: {
    setShow: (state, action) => {
      state.show = action.payload;
    },
    setActiveWordIndex: (state, action) => {
      state.activeWordIndex = action.payload.index;
      state.activeWord = action.payload.word;
      state.colour = action.payload.colour;
      state.synonyms = action.payload.synonyms;
    },
    closeWordStats: (state) => {
      state.activeWordIndex = -1;
      state.show = false;
    },
  },
});

export const { setShow, setActiveWordIndex, closeWordStats } = wordStatsSlice.actions;

export default wordStatsSlice.reducer;
