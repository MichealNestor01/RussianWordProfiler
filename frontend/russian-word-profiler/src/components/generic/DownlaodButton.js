import React from "react";
import { convertToCSV } from "../../functions/convertToCSV";
import { downloadCSV } from "../../functions/downloadCSV";

function DownloadButton({ data, filename, text }) {
  const handleClick = () => {
    const csv = convertToCSV(data);
    downloadCSV(csv, filename);
  };

  return <button onClick={handleClick}>{text}</button>;
}

export default DownloadButton;
