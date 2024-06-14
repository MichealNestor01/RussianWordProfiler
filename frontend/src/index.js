import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import store from "./store/store";
import { Provider } from "react-redux";

/**
 * @description
 * Entry point for the React application.
 *
 * @example
 * // This file typically renders the main App component into the root DOM element.
 * import React from 'react';
 * import ReactDOM from 'react-dom';
 * import App from './App';
 *
 * ReactDOM.render(<App />, document.getElementById('root'));
 */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
