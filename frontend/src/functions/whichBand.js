/**
 * @description
 * Determines the band for a given rank based on predefined bands.
 *
 * @param {number} rank - The rank to be evaluated.
 * @param {Object} bands - An object containing band information. Each key is a band identifier, and each value is an object with `topVal` and `bottomVal` properties.
 * @returns {string|number} The band identifier the rank falls into, or -1 if the rank does not fall into any band.
 *
 * @example
 * const bands = {
 *   "A": { topVal: 100, bottomVal: 90 },
 *   "B": { topVal: 89, bottomVal: 80 },
 *   "C": { topVal: 79, bottomVal: 70 }
 * };
 * const band = whichBand(85, bands);
 * console.log(band); // Output: "B"
 */
export function whichBand(rank, bands) {
  if (rank !== -1 && Object.keys(bands).length !== 0) {
    for (const [band, bandData] of Object.entries(bands)) {
      if (rank <= bandData.topVal && rank >= bandData.bottomVal) {
        return band;
      }
    }
  }
  return -1;
}
