/**
 * @memberof functions
 * @description
 * Triggers a download of a CSV file with the given content and filename.
 *
 * @param {string} csv - The CSV string to be downloaded.
 * @param {string} filename - The name of the file to be downloaded.
 *
 * @example
 * const csv = "name,age\nJohn,30\nJane,25";
 * downloadCSV(csv, "data.csv");
 */
export const downloadCSV = (csv, filename) => {
  const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  if (navigator.msSaveBlob) {
    // For Microsoft Edge and Internet Explorer
    navigator.msSaveBlob(csvData, filename);
  } else {
    // For other browsers
    const link = document.createElement("a");
    link.href = URL.createObjectURL(csvData);
    link.setAttribute("download", filename);
    link.click();
  }
};
