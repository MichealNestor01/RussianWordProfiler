import { createSlice } from "@reduxjs/toolkit";
import { splitText } from "../../functions/splitText";

// const TEXT =
//  "Администрация президента США Джо Байдена обеспокоена возможным обсуждением высокопоставленными российскими военными использования ядерного оружия в войне с Украиной. Военное руководство в Москве недавно вело дискуссии на эту тему. Об этом пишет газета New York Times со ссылкой на неназванных американских чиновников.\n\nПо данным издания, президент России Владимир Путин не был частью этих обсуждений. Он единственный, кто может принять решение об использовании такого оружия, вне зависимости от мнения генералов. Но сам факт таких дискуссий вызывает опасения Белого дома. Там считают, что обсуждение вызвано фрустрацией российских военных от неудач в войне с Украиной.\n\nЗападные страны считают, что Кремль с февраля регулярно намекает на возможность использования ядерного оружия. В выступлении 27 октября Путин заявил, что Москва никогда не говорила, что готова сделать это. За день до этого сотрудничающий с российским правительством Института мировой экономики и международных отношений РАН выпустил доклад, в котором утверждалось, что Запад неправильно трактует высказывания российских официальных лиц.\n\nАнонимные источники газеты Washington Post в администрации Байдена говорят, что американские чиновники не успокоены словами Путина. Там считают, что риск применения ядерного оружия повысится, когда Москва исчерпает свои силы и конвенциональное оружие в Украине.";
// const LINEBREAKS = [40, 90, 147];

export const textSlice = createSlice({
  name: "text",
  initialState: {
    words: "",
    text: "",
    textToProfile: "",
    textObjects: [],
    stopWords: [],
    showApiConfig: false,
    wordData: {},
  },
  reducers: {
    addParagraphEnd: (state, action) => {
      if (!state.lineBreaks.includes(action.payload.index)) {
        state.lineBreaks.push(action.payload.index);
      }
    },
    setLineBreaks: (state, action) => {
      state.lineBreaks = action.payload.new;
    },
    setParagraphBreaks: (state, action) => {
      state.lineBreaks = action.payload.new;
    },
    setBreaks: (state, action) => {
      state.lineBreaks = action.payload.lineBreaks;
      state.paragraphBreaks = action.payload.paragraphBreaks;
    },
    setWordData: (state, action) => {
      state.wordData = action.payload;
    },
    setText: (state, action) => {
      state.text = action.payload;
      const { objects, words } = splitText(action.payload);
      state.textObjects = objects;
      state.words = words.join(" ");
    },
    setStopWords: (state, action) => {
      state.stopWords = action.payload;
    },
    setShowApiConfig: (state, action) => {
      state.showApiConfig = action.payload;
    },
    changeWord: (state, action) => {
      const { newWord, index } = action.payload;
      state.textObjects[index].word = newWord;
      const words = state.words.split(" ");
      words[index] = newWord;
      state.words = words.join(" ");
      const text = state.textObjects.map(({ prefix, word, postfix }) => {
        if (word[0] != "\n") {
          return `${prefix}${word}${postfix} `;
        }
        return `${prefix}${word}${postfix}`;
      });
      state.text = text.join("");
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addParagraphEnd,
  setLineBreaks,
  setParagraphBreaks,
  setBreaks,
  setWordData,
  setText,
  setStopWords,
  setShowApiConfig,
  changeWord,
} = textSlice.actions;

export default textSlice.reducer;
