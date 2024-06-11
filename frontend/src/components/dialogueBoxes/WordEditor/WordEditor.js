import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { closeActiveDialogue } from "../../../store/slices/siteStateSlice";
import { whichBand } from "../../../functions/whichBand";
import { changeWord } from "../../../store/slices/textSlice";
import DialogBox from "../DialogBox";
const WordEditor = () => {
  const dispatch = useDispatch();
  const bands = useSelector((state) => state.bands);
  const {
    index: activeWordIndex,
    word,
    colour,
    synonyms,
  } = useSelector((state) => state.siteState.selectedWord);
  const [editorHeight, setEditorHeight] = useState(0);

  useEffect(() => {
    const listItemHeight = 24;
    const minHeight = 100;
    const extraHeight = 50;
    if (synonyms) {
      setEditorHeight(
        Math.max(minHeight, synonyms.length * listItemHeight + extraHeight)
      );
    }
  }, [synonyms]);

  return (
    <DialogBox
      header={
        <h1>
          Change Selected Word: <b style={{ color: colour }}>{word}</b>{" "}
        </h1>
      }
      content={
        synonyms !== undefined &&
        synonyms.length > 0 && (
          <div className="wordEditorList">
            <ul>
              {synonyms.map((synonym, index) => {
                const band = whichBand(synonym.rank, {...bands});
                const colour = band === -1 ? "black" : bands[band].colour
                return (
                  <li
                    key={`synonym-${index}`}
                    style={{ color: colour, cursor: "pointer" }}
                    className="wordOption"
                    onClick={() => {
                      dispatch(
                        changeWord({
                          index: activeWordIndex,
                          newWord: synonym.synonym,
                        })
                      );
                      dispatch(closeActiveDialogue());
                    }}
                  >
                    {synonym.synonym}
                  </li>
                );
              })}
            </ul>
          </div>
        )
      }
    />
  );
};

export default WordEditor;
