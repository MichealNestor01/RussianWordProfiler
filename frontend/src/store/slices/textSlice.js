import { createSlice } from "@reduxjs/toolkit";
import { splitText } from "../../functions/splitText";

export const textSlice = createSlice({
  name: "text",
  initialState: {
    text: "", // the raw text typed by the user
    words: "", // the words that make up the text typed
    tokens: [], // the tokensied text
    stopWords: [], // words to be ignored by the api
    wordData: {}, // data for each word returned by the api
  },
  reducers: {
    setWordData: (state, action) => {
      state.wordData = action.payload;
    },
    setText: (state, action) => {
      state.text = action.payload;
      const { objects, words } = splitText(action.payload);
      state.tokens = objects;
      state.words = words.join(" ");
    },
    setStopWords: (state, action) => {
      state.stopWords = action.payload;
    },
    changeWord: (state, action) => {
      // used to swap a word with a synonmym
      const { index, newWord, newWordRank, newWordLemma } = action.payload;

      // add the new word to word data.
      if (!(newWord in state.wordData)) {
        const oldWord = state.tokens[index].word;
        state.wordData[newWord] = {
          rank: newWordRank,
          lemma: newWordLemma,
          synonyms: [{ synonym: oldWord, rank: state.wordData[oldWord].rank }],
        };
      }

      // update the tokeon of the word being replaced
      state.tokens[index].word = newWord;

      // update the words string with the new word
      const words = state.words.split(" ");
      words[index] = newWord;
      state.words = words.join(" ");

      // update the text string with the new word
      const text = state.tokens.map(({ prefix, word, postfix }) => {
        if (word[0] !== "\n") {
          return `${prefix}${word}${postfix} `;
        }
        return `${prefix}${word}${postfix}`;
      });
      state.text = text.join("");
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWordData, setText, setStopWords, changeWord } =
  textSlice.actions;

export default textSlice.reducer;
