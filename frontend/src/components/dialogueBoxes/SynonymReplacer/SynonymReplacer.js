import { useSelector, useDispatch } from "react-redux";
import { whichBand } from "../../../functions/whichBand";
import { changeWord } from "../../../store/slices/textSlice";
import DialogBox from "../DialogBox";

const SynonymReplacer = ({ active, onClose, selectedWord }) => {
  const dispatch = useDispatch();
  const bands = useSelector((state) => state.bandsSlice.bands);
  const { index: activeWordIndex, word, colour, synonyms } = selectedWord;

  return (
    <DialogBox
      active={active}
      onClose={onClose}
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
                const band = whichBand(synonym.rank, { ...bands });
                const colour = band === -1 ? "black" : bands[band].colour;
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
                          newWordRank: synonym.rank,
                          newWordLemma: synonym.lemma,
                        })
                      );
                      onClose();
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

export default SynonymReplacer;
