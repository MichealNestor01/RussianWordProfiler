import React from "react";
import { convertToCSV } from "../../functions/convertToCSV";
import { downloadCSV } from "../../functions/downloadCSV";

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

  return <button onClick={handleClick}>{text}</button>;
}

export default DownloadButton;
