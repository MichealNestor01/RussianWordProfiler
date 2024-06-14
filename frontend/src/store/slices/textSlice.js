import { createSlice } from "@reduxjs/toolkit";
import { splitText } from "../../functions/splitText";

/**
 * Redux slice for managing text-related state, including the raw text, tokenized text, stop words, and word data.
 *
 * @namespace ReduxStoreTextSlice
 */
export const textSlice = createSlice({
  name: "text",
  initialState: {
    text: "", // the raw text typed by the user
    words: "", // the words that make up the text typed
    tokens: [], // the tokenized text
    stopWords: [], // words to be ignored by the API
    wordData: {}, // data for each word returned by the API
  },
  reducers: {
    /**
     * Sets the word data returned by the API.
     * @memberof ReduxStoreTextSlice
     *
     * @param {Object} state - The current state of the Redux store, provided automatically.
     * @param {Object} action - The action object containing payload with the new word data.
     *
     * @example
     * dispatch(setWordData({ 'word': { rank: 1, lemma: 'example', synonyms: [] }}));
     */
    setWordData: (state, action) => {
      state.wordData = action.payload;
    },

    /**
     * Sets the raw text, tokenizes it, and updates the words and tokens in the state.
     * @memberof ReduxStoreTextSlice
     *
     * @param {Object} state - The current state of the Redux store, provided automatically.
     * @param {Object} action - The action object containing payload with the new text.
     *
     * @example
     * dispatch(setText("Hello world"));
     */
    setText: (state, action) => {
      state.text = action.payload;
      const { objects, words } = splitText(action.payload);
      state.tokens = objects;
      state.words = words.join(" ");
    },

    /**
     * Sets the stop words to be ignored by the API.
     * @memberof ReduxStoreTextSlice
     *
     * @param {Object} state - The current state of the Redux store, provided automatically.
     * @param {Object} action - The action object containing payload with the new stop words.
     *
     * @example
     * dispatch(setStopWords(["the", "and"]));
     */
    setStopWords: (state, action) => {
      state.stopWords = action.payload;
    },

    /**
     * Changes a word in the tokenized text to a synonym and updates the relevant state.
     * @memberof ReduxStoreTextSlice
     *
     * @param {Object} state - The current state of the Redux store, provided automatically.
     * @param {Object} action - The action object containing payload with the index of the word to change, the new word, its rank, and lemma.
     *
     * @example
     * dispatch(changeWord({ index: 1, newWord: 'hi', newWordRank: 2, newWordLemma: 'hi' }));
     */
    changeWord: (state, action) => {
      const { index, newWord, newWordRank, newWordLemma } = action.payload;

      if (!(newWord in state.wordData)) {
        const oldWord = state.tokens[index].word;
        state.wordData[newWord] = {
          rank: newWordRank,
          lemma: newWordLemma,
          synonyms: [{ synonym: oldWord, rank: state.wordData[oldWord].rank }],
        };
      }

      state.tokens[index].word = newWord;

      const words = state.words.split(" ");
      words[index] = newWord;
      state.words = words.join(" ");

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
