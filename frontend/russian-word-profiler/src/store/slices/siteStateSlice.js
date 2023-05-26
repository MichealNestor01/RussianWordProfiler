import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dialogueWindows: ["bands", "words", "api"],
  activeWindow: "",
  selectedWord: {
    index: -1,
    word: "",
    colour: "",
    synonyms: [],
  },
};

export const siteStateSlice = createSlice({
  name: "siteState",
  initialState,
  reducers: {
    setActiveDialogue: (state, action) => {
      console.log("setting active widow: ", action.payload);
      state.activeWindow = action.payload;
    },
    closeActiveDialogue: (state) => {
      state.activeWindow = "";
      state.selectedWord.index = -1;
    },
    setSelectedWord: (state, action) => {
      state.selectedWord = action.payload;
    },
  },
});

export const { setActiveDialogue, closeActiveDialogue, setSelectedWord } = siteStateSlice.actions;

export default siteStateSlice.reducer;
