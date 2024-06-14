import React, { useState, useRef } from "react";

/**
 * @description
 * Generic component for displaying a bar representing a band. Shows a tooltip with the total number of words on hover.
 *
 * @component
 * @param {Object} props - The props for BandBar.
 * @param {number} props.index - The index of the band bar.
 * @param {number} props.total - The total number of words in the band.
 * @param {string} props.width - The width of the band bar.
 * @param {string} props.colour - The color of the band bar.
 *
 * @example
 * return (
 *   <BandBar index={0} total={100} width="50%" colour="red" />
 * )
 */
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
