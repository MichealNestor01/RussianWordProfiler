import { configureStore } from "@reduxjs/toolkit";
import bandsReducer from "./bandsSlice";
import textReducer from "./textSlice";

const store = configureStore({
  reducer: {
    bands: bandsReducer,
    text: textReducer,
  },
});

export default store;
