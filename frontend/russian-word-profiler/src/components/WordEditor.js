import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { changeTopValue, removeBand, addBand } from "../store/bandsSlice";
import { setShow, setActiveWordIndex, closeWordStats } from "../store/wordStatsSlice";
import { whichColour } from "../functions/whichColour";

const WordEditor = () => {
  const dispatch = useDispatch();
  const bands = useSelector((state) => state.bands);
  const { activeWord: word, colour, synonyms } = useSelector((state) => state.wordStats);

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
              console.log("This is a synonym");
              console.log(synonym);
              const colour = whichColour(synonym.rank, [...bands]);
              console.log(colour);
              return (
                <li key={`synonym-${index}`} style={{ color: colour }}>
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
