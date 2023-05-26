import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { setShow, setActiveWordIndex, closeWordStats } from "../../../store/wordStatsSlice";

import { whichColour } from "../../../functions/whichColour";
import { changeWord } from "../../../store/textSlice";

const WordEditor = () => {
  const dispatch = useDispatch();
  const bands = useSelector((state) => state.bands);
  const {
    activeWord: word,
    colour,
    synonyms,
    activeWordIndex,
  } = useSelector((state) => state.wordStats);
  const [editorHeight, setEditorHeight] = useState(0);

  useEffect(() => {
    const listItemHeight = 24;
    const minHeight = 100;
    const extraHeight = 50;
    if (synonyms) {
      setEditorHeight(Math.max(minHeight, synonyms.length * listItemHeight + extraHeight));
    }
  }, [synonyms]);

  return (
    <motion.div
      initial={{ opacity: 0, y: "-400px", x: "400px" }}
      animate={{ opacity: 1, y: "-440px", x: "400px" }}
      exit={{ opacity: 0, y: "-400px", x: "400px" }}
      transition={{ duration: 0.2 }}
      className="wordEditor"
      style={{ height: editorHeight }}
    >
      <div className="top">
        <h2>
          Selected Word: <span style={{ color: colour }}>{word}</span>
        </h2>
        <div
          className="closeButton"
          onClick={() => {
            dispatch(closeWordStats());
          }}
        >
          x
        </div>
      </div>
      {synonyms !== undefined && synonyms.length > 0 && (
        <div>
          Synonyms:{" "}
          <ul>
            {synonyms.map((synonym, index) => {
              const [colour] = whichColour(synonym.rank, [...bands]);
              return (
                <li
                  key={`synonym-${index}`}
                  style={{ color: colour, cursor: "pointer" }}
                  onClick={() => {
                    dispatch(setShow(false));
                    dispatch(changeWord({ index: activeWordIndex, newWord: synonym.synonym }));
                    dispatch();
                  }}
                >
                  {synonym.synonym}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default WordEditor;
