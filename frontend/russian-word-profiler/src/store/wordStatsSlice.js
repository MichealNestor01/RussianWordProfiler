import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  activeWordIndex: -1,
};

export const wordStatsSlice = createSlice({
  name: "wordStats",
  initialState,
  reducers: {
    setShow: (state, action) => {
      state.show = action.payload;
    },
    setActiveWordIndex: (state, action) => {
      state.activeWordIndex = action.payload;
    },
  },
});

export const { setShow, setActiveWordIndex } = wordStatsSlice.actions;

export default wordStatsSlice.reducer;
