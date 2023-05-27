// function to downlaod csv file
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
