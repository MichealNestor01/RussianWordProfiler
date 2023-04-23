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
      console.log("SET SHOW: ", action.payload);
      state.show = action.payload;
    },
    setActiveBandIndex: (state, action) => {
      console.log("SET ACTIVE BAND: ", action.payload);
      state.activeBandIndex = action.payload;
    },
  },
});

export const { setShow, setActiveBandIndex } = bandsConfigSlice.actions;

export default bandsConfigSlice.reducer;
