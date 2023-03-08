import { createSlice } from "@reduxjs/toolkit";

export const textSlice = createSlice({
  name: "text",
  initialState: {
    lineBreaks: [],
  },
  reducers: {
    addParagraphEnd: (state, action) => {
      if (!state.lineBreaks.includes(action.payload.index)) {
        state.lineBreaks.push(action.payload.index);
      }
    },
    setLineBreaks: (state, aciton) => {
      state.lineBreaks = aciton.payload.new;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addParagraphEnd, setLineBreaks } = textSlice.actions;

export default textSlice.reducer;
