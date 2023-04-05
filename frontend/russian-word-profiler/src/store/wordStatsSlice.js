import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  activeWordIndex: -1,
  activeWord: "",
  colour: "black",
  data: {},
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
      state.data = action.payload.data;
    },
  },
});

export const { setShow, setActiveWordIndex } = wordStatsSlice.actions;

export default wordStatsSlice.reducer;
