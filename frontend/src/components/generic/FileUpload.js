import React from "react";
import { useDispatch } from "react-redux";
import { setStopWords } from "../../store/slices/textSlice";

/**
 * @description
 * Component for uploading a file to set stop words in the Redux store.
 *
 * ### Redux Store Interaction
 * The component dispatches the following Redux actions:
 * - `setStopWords`: Action to set the stop words in the Redux store.
 *
 * @component
 *
 * @example
 * return (
 *   <FileUpload />
 * )
 */
const FileUpload = () => {
  const dispatch = useDispatch();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      // Split the text into lines
      const lines = text.split(/\r\n|\n|\r/);

      // Validate that each line contains a single word with Unicode support
      const validFormat = lines.every((line) => /^\s*\p{L}+\s*$/u.test(line));

      if (validFormat) {
        // Trim whitespace and create the words array
        const words = lines.map((line) => line.trim());
        dispatch(setStopWords(words));
      } else {
        alert(
          "Invalid file format. Please upload a file with one word per line."
        );
      }
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" accept=".txt" onChange={handleFileUpload} />
    </div>
  );
};

export default FileUpload;
