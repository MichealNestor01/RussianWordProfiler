import { configureStore } from "@reduxjs/toolkit";
import bandsReducer from "./bandsSlice";
import textReducer from "./textSlice";
import bandsConfigReducer from "./bandsConfigSlice";
import wordStatsReducer from "./wordStatsSlice";
import bandsStatsSlice from "./bandsStatsSlice";

const store = configureStore({
  reducer: {
    config: bandsConfigReducer,
    bands: bandsReducer,
    text: textReducer,
    wordStats: wordStatsReducer,
    bandStats: bandsStatsSlice,
  },
});

export default store;
