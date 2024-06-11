import { configureStore } from "@reduxjs/toolkit";
import textReducer from "./slices/textSlice";
import frequencyBandsReducer from "./slices/frequencyBandsSlice";
import siteStateReducer from "./slices/siteStateSlice";
import statsReducer from "./slices/statsSlice";

const store = configureStore({
  reducer: {
    bands: frequencyBandsReducer,
    siteState: siteStateReducer,
    text: textReducer,
    stats: statsReducer,
  },
});

export default store;
