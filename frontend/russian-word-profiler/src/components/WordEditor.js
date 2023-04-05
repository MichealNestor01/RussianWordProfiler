import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { changeTopValue, removeBand, addBand } from "../store/bandsSlice";
import { setShow, setActiveWordIndex } from "../store/wordStatsSlice";

const WordEditor = () => {
  const dispatch = useDispatch();
  const { activeWord: word, colour, data } = useSelector((state) => state.wordStats);
  const [definition, setDefinition] = useState("");
  const [synonyms, setSynonyms] = useState("");

  useEffect(() => {
    if (data != undefined) {
      setDefinition(data.definition);
      setSynonyms(data.synonyms);
    }
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: "-400px", x: "400px" }}
      animate={{ opacity: 1, y: "-440px", x: "400px" }}
      exit={{ opacity: 0, y: "-400px", x: "400px" }}
      transition={{ duration: 0.2 }}
      className="wordEditor"
    >
      <div className="top">
        <h2>
          Selected Word: <span style={{ color: colour }}>{word}</span>
        </h2>
        <div
          className="closeButton"
          onClick={() => {
            dispatch(setShow(false));
            dispatch(setActiveWordIndex(-1));
          }}
        >
          x
        </div>
      </div>
      {definition.length > 0 && <div>Definition: {definition}</div>}
      {synonyms.length > 0 && (
        <div>
          Synonyms:{" "}
          <ul>
            {synonyms.map((synonym, index) => {
              return <li key={`synonym-${index}`}>{synonym}</li>;
            })}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default WordEditor;
