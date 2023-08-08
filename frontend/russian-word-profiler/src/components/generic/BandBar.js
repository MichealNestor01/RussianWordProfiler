import React, { useState, useRef } from "react";

const BandBar = ({ index, total, width, colour }) => {
  const [tooltipText, setTooltipText] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef(null);
  const handleMouseMove = (event) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseEnter = (text) => {
    setTooltipText(text);
  };

  const handleMouseLeave = () => {
    setTooltipText("");
  };

  return (
    <div
      className="bandBar"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => handleMouseEnter(total + " Words")}
      onMouseLeave={handleMouseLeave}
      key={`bandBar${index}`}
      style={{
        width: width,
        background: colour,
      }}
    >
      {tooltipText && (
        <div
          className="bandTooltip"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y + 30,
          }}
          ref={tooltipRef}
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default BandBar;
