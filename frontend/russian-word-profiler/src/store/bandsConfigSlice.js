import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  activeBandIndex: -1,
};

export const bandsConfigSlice = createSlice({
  name: "bands",
  initialState,
  reducers: {
    setShow: (state, action) => {
      state.show = action.payload;
    },
    setActiveBandIndex: (state, action) => {
      state.activeBandIndex = action.payload;
    },
  },
});

export const { setShow, setActiveBandIndex } = bandsConfigSlice.actions;

export default bandsConfigSlice.reducer;
