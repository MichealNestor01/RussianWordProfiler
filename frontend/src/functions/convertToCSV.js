/**
 * @memberof functions
 * @description
 * Converts a 2D array of JavaScript objects to a CSV string.
 *
 * @param {Array<Array<string|number>>} arr - The 2D array of data to be converted to CSV format.
 * @returns {string} The CSV formatted string.
 *
 * @example
 * const data = [
 *   ["name", "age"],
 *   ["John", 30],
 *   ["Jane", 25]
 * ];
 * const csv = convertToCSV(data);
 * console.log(csv);
 * // Output:
 * // name,age
 * // John,30
 * // Jane,25
 */
export function convertToCSV(arr) {
  let str = "";

  for (let i = 0; i < arr.length; i++) {
    let line = "";

    for (let j = 0; j < arr[i].length; j++) {
      if (line !== "") line += ",";

      line += arr[i][j];
    }

    str += line + "\r\n";
  }

  return str;
}
