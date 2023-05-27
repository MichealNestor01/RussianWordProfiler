// java script function to convert a js object to a csv
export const convertToCSV = (objArray) => {
  const array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
  let str = "";

  for (let i = 0; i < array.length; i++) {
    let line = "";

    for (let key in array[i]) {
      if (line !== "") line += ",";

      line += array[i][key];
    }

    str += line + "\r\n";
  }

  return str;
};
