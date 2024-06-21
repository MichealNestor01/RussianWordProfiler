import DialogBox from "../DialogBox";
import { Fragment, useState } from "react";
import TextFileUpload from "../../generic/TextFileUpload";
import { useSelector } from "react-redux";
import {
  XMarkIcon,
  PlusIcon,
  CloudArrowUpIcon,
  CloudArrowDownIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Switch from "../../generic/Switch";

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
  const stopWords = useSelector((state) => state.text.stopWords);
  const [showAddStopWord, setShowAddStopWord] = useState(false);
  const [newStopWord, setNewStopWord] = useState("");
  const [useCaseSensitive, setUseCaseSensitive] = useState(false);

  const updateNewStopWord = (e) => {
    const { value } = e.target;
    if (/\s/.test(value)) {
      e.target.value = newStopWord;
      setShowAddStopWord(false);
      return;
    }
    setNewStopWord(value);
    setShowAddStopWord(
      stopWords.filter((word) => word === value).length === 0 && value !== ""
    );
  };

  return (
    <DialogBox
      active={active}
      onClose={onClose}
      header={
        <div className="apiSettingsHeader">
          <h1>Api Settings </h1>

          <p>Use Case-Sensitive</p>
          <Switch value={useCaseSensitive} onToggle={setUseCaseSensitive} />
        </div>
      }
      content={
        <div className="apiSettingsContainer">
          <div className="maxHeight">
            {stopWords.length > 0 ? (
              stopWords.map((word, index) => (
                <div className="stopWord" key={index + "STOPWORD"}>
                  <p>{word}</p>
                  <XMarkIcon className="delete" />
                </div>
              ))
            ) : (
              <p className="noStopWords">No stop words added</p>
            )}
          </div>
          <div className="buttonContainer">
            <div className="addStopwordContainer">
              <input
                placeholder="New Stop Word"
                text={newStopWord}
                onChange={(e) => updateNewStopWord(e)}
                style={{
                  color:
                    showAddStopWord || newStopWord === "" ? "black" : "red",
                }}
              />

              <button className={`addButton ${showAddStopWord && "active"}`}>
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
            <button>
              <CloudArrowDownIcon className="configIcon" />
              Download Stopwords
            </button>
            <button>
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
