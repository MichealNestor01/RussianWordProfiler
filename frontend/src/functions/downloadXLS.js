import * as XLSX from 'xlsx';

// function to download xls file
export const downloadXLS = (data, filename) => {
    // convert data to a worksheet
    const ws = XLSX.utils.json_to_sheet(data);

    // create a workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Generate the XLS file as a Blob
    const xlsData = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([xlsData], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

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
}