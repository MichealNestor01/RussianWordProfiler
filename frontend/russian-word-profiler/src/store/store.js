import { configureStore } from "@reduxjs/toolkit";
import textReducer from "./textSlice";
import frequencyBandsReducer from "./frequencyBandsSlice";
import siteStateReducer from "./siteStateSlice";
import statsReducer from "./statsSlice";

const store = configureStore({
  reducer: {
    bands: frequencyBandsReducer,
    siteState: siteStateReducer,
    text: textReducer,
    stats: statsReducer,
  },
});

export default store;
