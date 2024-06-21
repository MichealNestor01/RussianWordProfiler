import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { setStopWords } from "../../store/slices/textSlice";
import { useRef } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";

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
const TextFileUpload = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

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
    <Fragment>
      <button onClick={() => fileInputRef.current.click()}>
        <CloudArrowUpIcon className="configIcon" />
        Upload Stopwords
      </button>
      <input
        ref={fileInputRef}
        style={{ display: "none" }}
        type="file"
        accept=".txt"
        onChange={handleFileUpload}
      />
    </Fragment>
  );
};

export default TextFileUpload;
