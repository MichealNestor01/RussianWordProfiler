// java script function to convert a js object to a csv
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
