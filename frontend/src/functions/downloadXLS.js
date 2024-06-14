import * as XLSX from "xlsx";

/**
 * @memberof functions
 * @description
 * Triggers a download of an XLS file with the given data and filename.
 *
 * ### Dependencies
 * This function depends on the `XLSX` library for converting JSON data to an XLSX format.
 *
 * @param {Array<Object>} data - The data to be included in the XLS file. Each object represents a row.
 * @param {string} filename - The name of the file to be downloaded.
 *
 * @example
 * const data = [
 *   { name: "John", age: 30 },
 *   { name: "Jane", age: 25 }
 * ];
 * downloadXLS(data, "data.xlsx");
 */
export const downloadXLS = (data, filename) => {
  // convert data to a worksheet
  const ws = XLSX.utils.json_to_sheet(data);

  // create a workbook and add the worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Generate the XLS file as a Blob
  const xlsData = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([xlsData], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  if (navigator.msSaveBlob) {
    // For Microsoft Edge and Internet Explorer
    navigator.msSaveBlob(blob, filename);
  } else {
    // For other browsers
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    link.click();
  }
};
