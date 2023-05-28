// java script function to convert a js object to a csv
export function convertToCSV(obj) {
  const array = Object.entries(obj);
  let str = "";

  for (let i = 0; i < array.length; i++) {
    let line = "";

    for (let j = 0; j < array[i].length; j++) {
      if (line !== "") line += ",";

      line += array[i][j];
    }

    str += line + "\r\n";
  }

  return str;
}
