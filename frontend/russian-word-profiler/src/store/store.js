import { configureStore } from "@reduxjs/toolkit";
import bandsReducer from "./bandsSlice";
import textReducer from "./textSlice";
import bandsConfigReducer from "./bandsConfigSlice";

const store = configureStore({
  reducer: {
    config: bandsConfigReducer,
    bands: bandsReducer,
    text: textReducer,
  },
});

export default store;
