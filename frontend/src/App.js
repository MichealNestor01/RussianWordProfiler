import { useEffect } from "react";
import background from "./assets/background.png";
import Main from "./pages/Main";
import About from "./pages/About";
import NotFoundError from "./pages/NotFoundError";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//const apiURL = "russian-word-profiler-api.fseggvhtdefnbdez.uksouth.azurecontainer.io:5000";
let initial = true;

/**
 * @namespace functions
 */

const router = createBrowserRouter([
  {
    element: <Main />,
    path: "/",
    errorElement: <NotFoundError />,
  },
  {
    element: <About />,
    path: "/about",
    errorElement: <NotFoundError />,
  },
]);

/**
 * @description
 * Main application component for the Russian Word Profiler.
 *
 * ### Initialization
 * On the initial load, the application displays an alert informing users about the project's new status and requesting bug reports.
 *
 * @component
 *
 * @example
 * return (
 *   <App />
 * )
 */
function App() {
  useEffect(() => {
    if (initial) {
      alert(
        "This project is still new and may have a few bugs, non-standard displays are not yet supported, if you do find some wierd behaviour please report them to michealnestor@outlook.com"
      );
    }
    initial = false;
  }, []);

  return (
    <div className="page-wrapper">
      <div className="title-container">
        <h1 className="title">Russian Word Profiler</h1>
      </div>
      <RouterProvider router={router} />
      {/* This is a background splash image */}
      <div className="image-container">
        <img src={background} alt="background splash" className="image" />
      </div>
    </div>
  );
}

export default App;
