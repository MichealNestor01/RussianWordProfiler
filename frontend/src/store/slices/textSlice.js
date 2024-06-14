import { createSlice } from "@reduxjs/toolkit";
import { splitText } from "../../functions/splitText";

/**
 * @description
 * Redux slice for managing text-related state, including the raw text, tokenized text, stop words, and word data.
 *
 * ### Initial State
 * - `text`: The raw text typed by the user.
 * - `words`: The words that make up the text typed.
 * - `tokens`: The tokenized text.
 * - `stopWords`: Words to be ignored by the API.
 * - `wordData`: Data for each word returned by the API.
 *
 * @example
 * import { useDispatch, useSelector } from 'react-redux';
 * import { setText, setStopWords } from './textSlice';
 *
 * const dispatch = useDispatch();
 * const text = useSelector((state) => state.textSlice.text);
 *
 * dispatch(setText("Hello world"));
 * dispatch(setStopWords(["the", "and"]));
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
     * @description
     * Sets the word data returned by the API.
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object containing payload with the new word data.
     */
    setWordData: (state, action) => {
      state.wordData = action.payload;
    },

    /**
     * @description
     * Sets the raw text, tokenizes it, and updates the words and tokens in the state.
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object containing payload with the new text.
     */
    setText: (state, action) => {
      state.text = action.payload;
      const { objects, words } = splitText(action.payload);
      state.tokens = objects;
      state.words = words.join(" ");
    },

    /**
     * @description
     * Sets the stop words to be ignored by the API.
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object containing payload with the new stop words.
     */
    setStopWords: (state, action) => {
      state.stopWords = action.payload;
    },

    /**
     * @description
     * Changes a word in the tokenized text to a synonym and updates the relevant state.
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action object containing payload with the index of the word to change, the new word, its rank, and lemma.
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
