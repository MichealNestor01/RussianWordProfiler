import DialogBox from "../DialogBox";
import { Fragment, useState, useRef } from "react";
import TextFileUpload from "../../generic/TextFileUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  XMarkIcon,
  PlusIcon,
  CloudArrowUpIcon,
  CloudArrowDownIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  deleteStopWord,
  addStopWord,
  setStopWords,
} from "../../../store/slices/textSlice";
import { downloadStopwords } from "../../../functions/downloadStopwords";
import { getDatetimeString } from "../../../functions/getDatetimeString";

/**
 * @description
 * Component for API settings dialog.
 *
 * @component
 *
 * @example
 * return (
 *   <ApiSettings />
 * )
 */
const ApiSettings = ({ active, onClose }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { stopWords } = useSelector((state) => state.text);
  const [showAddStopWord, setShowAddStopWord] = useState(false);
  const [newStopWord, setNewStopWord] = useState("");

  const updateNewStopWord = (e) => {
    const { value } = e.target;
    if (/\s/.test(value) || value.toLowerCase() !== value) {
      e.target.value = newStopWord;
      setShowAddStopWord(false);
      return;
    }
    setNewStopWord(value);
    setShowAddStopWord(
      stopWords.filter((word) => word === value).length === 0 && value !== ""
    );
  };

  const onAddButtonClick = () => {
    if (showAddStopWord) {
      dispatch(addStopWord(newStopWord));
      setNewStopWord("");
      inputRef.current.value = "";
      setShowAddStopWord(false);
    }
  };
  return (
    <DialogBox
      active={active}
      onClose={() => {
        onClose();
        setNewStopWord("");
      }}
      header={
        <div className="apiSettingsHeader">
          <h1>Api Settings </h1>
        </div>
      }
      content={
        <div className="apiSettingsContainer">
          <div className="maxHeight">
            {stopWords.length > 0 ? (
              stopWords.map((word, index) => (
                <div className="stopWord" key={index + "STOPWORD"}>
                  <p>{word.toLowerCase()}</p>
                  <button
                    className="delete"
                    onClick={() => dispatch(deleteStopWord(word))}
                  >
                    <XMarkIcon />
                  </button>
                </div>
              ))
            ) : (
              <p className="noStopWords">No stop words added</p>
            )}
          </div>
          <div className="buttonContainer">
            <div className="addStopwordContainer">
              <input
                ref={inputRef}
                placeholder="New Stop Word"
                text={newStopWord}
                onChange={(e) => updateNewStopWord(e)}
                style={{
                  color:
                    showAddStopWord || newStopWord === "" ? "black" : "red",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onAddButtonClick();
                  }
                }}
              />

              <button
                className={`addButton ${showAddStopWord && "active"}`}
                onClick={onAddButtonClick}
              >
                <PlusIcon /> Add New Stopword
              </button>
            </div>
            {/* <h1>Upload stopwords</h1> */}
            {/* <TextFileUpload /> */}
          </div>

          <div className="orDivider">
            <div className="divider"></div>
            <p>OR</p>
            <div className="divider"></div>
          </div>

          <div className="bandConfigOptions">
            <TextFileUpload />
            <button
              onClick={() => {
                if (stopWords.length > 0) {
                  const now = getDatetimeString();
                  downloadStopwords(
                    stopWords,
                    "Russian Word Profiler Stopwords File",
                    `StopWords-${now}.stopwords`
                  );
                }
              }}
            >
              <CloudArrowDownIcon className="configIcon" />
              Download Stopwords
            </button>
            <button onClick={() => dispatch(setStopWords([]))}>
              <TrashIcon className="configIcon" />
              Clear All Stopwords
            </button>
          </div>
        </div>
      }
    />
  );
};

export default ApiSettings;
