/**
 * @memberof functions
 * @description
 * Determines the color for a given rank based on predefined bands.
 *
 * @param {number} rank - The rank to be evaluated.
 * @param {Array<Object>} bands - An array of band objects, each containing `top` and `colour` properties.
 * @returns {Array} An array where the first element is the color associated with the rank, and the second element is the corresponding band object.
 *                  Returns ["black", { top: "N/A", colour: "black" }] if the rank is -1.
 *
 * @example
 * const bands = [
 *   { top: 100, colour: "red" },
 *   { top: 80, colour: "blue" },
 *   { top: 60, colour: "green" }
 * ];
 * const [colour, band] = whichColour(85, bands);
 * console.log(colour); // Output: "blue"
 * console.log(band);   // Output: { top: 80, colour: "blue" }
 */
export const whichColour = (rank, bands) => {
  if (rank === -1) {
    return ["black", { top: "N/A", colour: "black" }];
  }
  for (let bandIndex = 0; bandIndex < bands.length; bandIndex++) {
    const band = bands[bandIndex];
    if (rank < band.top) {
      return [band.colour, band];
    }
  }
};
