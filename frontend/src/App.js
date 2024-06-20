import { useEffect } from "react";
import background from "./assets/background.png";
import Main from "./pages/Main";
import About from "./pages/About";
import NotFoundError from "./pages/NotFoundError";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import NavBarItem from "./components/generic/NavBarItem";

//const apiURL = "russian-word-profiler-api.fseggvhtdefnbdez.uksouth.azurecontainer.io:5000";
let initial = true;

/**
 * @namespace functions
 */

const routes = [
  {
    element: <Main />,
    title: "Home",
    path: "/",
  },
  {
    element: <About />,
    title: "About",
    path: "/about",
  },
];

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
  const navigate = useNavigate();
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
        <h1 className="title" onClick={() => navigate("/")}>
          Russian Word Profiler
        </h1>
        <div className="nav-bar">
          {routes.map((route) => (
            <NavBarItem
              key={route.path + "navItem"}
              title={route.title}
              path={route.path}
            />
          ))}
        </div>
      </div>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path + "route"}
            element={route.element}
            path={route.path}
          />
        ))}
        <Route path="*" element={<NotFoundError />} />
      </Routes>
      {/* This is a background splash image */}
      <div className="image-container">
        <img
          style={{ userSelect: "none" }}
          src={background}
          alt="background splash"
          className="image"
        />
      </div>
    </div>
  );
}

export default App;
