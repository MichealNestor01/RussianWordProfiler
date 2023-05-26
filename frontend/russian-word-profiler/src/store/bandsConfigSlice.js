import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
};

export const bandsConfigSlice = createSlice({
  name: "bands",
  initialState,
  reducers: {
    setShow: (state, action) => {
      state.show = action.payload;
    },
  },
});

export const { setShow } = bandsConfigSlice.actions;

export default bandsConfigSlice.reducer;
