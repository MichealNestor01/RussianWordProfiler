import React from "react";
import { convertToCSV } from "../../functions/convertToCSV";
import { downloadCSV } from "../../functions/downloadCSV";
import downloadIcon from "../../assets/download_icon.svg";

function DownloadButton({ data, filename, text }) {
  const handleClick = () => {
    const currentdate = new Date();
    const datetime =
      currentdate.getDate() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getFullYear() +
      " " +
      currentdate.getHours() +
      "-" +
      currentdate.getMinutes() +
      "-" +
      currentdate.getSeconds();
    const csv = convertToCSV(data);
    downloadCSV(csv, `${filename} ${datetime}.csv`);
  };

  return (
    <button className="downloadButton tooltip" onClick={handleClick}>
      <p class="tooltipHovered">Download Data</p>
      <svg viewBox="0 0 20 20">
        <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
        <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
      </svg>
    </button>
  );
}

export default DownloadButton;
