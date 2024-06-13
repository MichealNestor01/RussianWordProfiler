import { configureStore } from "@reduxjs/toolkit";
import textReducer from "./slices/textSlice";
import frequencyBandsReducer from "./slices/frequencyBandsSlice";
import statsReducer from "./slices/statsSlice";

const store = configureStore({
  reducer: {
    bands: frequencyBandsReducer,
    text: textReducer,
    stats: statsReducer,
  },
});

export default store;
