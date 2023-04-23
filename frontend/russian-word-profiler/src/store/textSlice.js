import { createSlice } from "@reduxjs/toolkit";

const TEXT =
  "Администрация президента США Джо Байдена обеспокоена возможным обсуждением высокопоставленными российскими военными использования ядерного оружия в войне с Украиной. Военное руководство в Москве недавно вело дискуссии на эту тему. Об этом пишет газета New York Times со ссылкой на неназванных американских чиновников.\n\nПо данным издания, президент России Владимир Путин не был частью этих обсуждений. Он единственный, кто может принять решение об использовании такого оружия, вне зависимости от мнения генералов. Но сам факт таких дискуссий вызывает опасения Белого дома. Там считают, что обсуждение вызвано фрустрацией российских военных от неудач в войне с Украиной.\n\nЗападные страны считают, что Кремль с февраля регулярно намекает на возможность использования ядерного оружия. В выступлении 27 октября Путин заявил, что Москва никогда не говорила, что готова сделать это. За день до этого сотрудничающий с российским правительством Института мировой экономики и международных отношений РАН выпустил доклад, в котором утверждалось, что Запад неправильно трактует высказывания российских официальных лиц.\n\nАнонимные источники газеты Washington Post в администрации Байдена говорят, что американские чиновники не успокоены словами Путина. Там считают, что риск применения ядерного оружия повысится, когда Москва исчерпает свои силы и конвенциональное оружие в Украине.";

export const textSlice = createSlice({
  name: "text",
  initialState: {
    text: TEXT,
    lineBreaks: [],
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
    setLineBreaks: (state, aciton) => {
      state.lineBreaks = aciton.payload.new;
    },
    setWordData: (state, action) => {
      state.wordData = action.payload;
    },
    setText: (state, action) => {
      state.text = action.payload;
    },
    setStopWords: (state, action) => {
      state.stopWords = action.payload;
    },
    setShowApiConfig: (state, action) => {
      state.showApiConfig = action.payload;
    },
    changeWord: (state, action) => {
      const { newWord, index } = action.payload;
      let words = state.text.split(/[^\S\n]+/);
      words[index] = newWord;
      state.text = words.join(" ");
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addParagraphEnd,
  setLineBreaks,
  setWordData,
  setText,
  setStopWords,
  setShowApiConfig,
  changeWord,
} = textSlice.actions;

export default textSlice.reducer;
