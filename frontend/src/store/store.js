import { configureStore } from "@reduxjs/toolkit";
import textReducer from "./slices/textSlice";
import frequencyBandsReducer from "./slices/frequencyBandsSlice";
import statsReducer from "./slices/statsSlice";

/**
 * @description
 * Configures the Redux store with slices for text, frequency bands, and statistics.
 *
 * @example
 * import { Provider } from 'react-redux';
 * import store from './store';
 *
 * const App = () => (
 *   <Provider store={store}>
 *     <MyComponent />
 *   </Provider>
 * );
 */
const store = configureStore({
  reducer: {
    bandsSlice: frequencyBandsReducer,
    text: textReducer,
    stats: statsReducer,
  },
});

export default store;
