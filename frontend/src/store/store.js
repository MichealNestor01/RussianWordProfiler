import { configureStore } from "@reduxjs/toolkit";
import textReducer from "./slices/textSlice";
import frequencyBandsReducer from "./slices/frequencyBandsSlice";
import siteStateReducer from "./slices/siteStateSlice";
import statsReducer from "./slices/statsSlice";
import selectedBandReducer from "./slices/selectedBandSlice";
const store = configureStore({
  reducer: {
    bands: frequencyBandsReducer,
    siteState: siteStateReducer,
    text: textReducer,
    stats: statsReducer,
    selectedBands: selectedBandReducer,
  },
});

export default store;
