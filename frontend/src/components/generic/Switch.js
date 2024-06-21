import { useState, Fragment } from "react";

function Switch({ value, onToggle }) {
  const [toggled, toggle] = useState(value);

  function setToggled(state) {
    toggle(state);
    onToggle(state);
  }

  return (
    <div className="switchButton">
      <button className="switch" onClick={() => setToggled(!toggled)}>
        <div className="switch-container">
          <div
            className={"line " + (toggled ? "bg-hard-divider" : "bg-divider")}
          ></div>
          <div
            className={"ball " + (toggled ? "ball-right" : "ball-left")}
          ></div>
        </div>
      </button>
    </div>
  );
}

export default Switch;
