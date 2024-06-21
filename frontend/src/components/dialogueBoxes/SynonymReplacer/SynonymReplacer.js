import { useSelector, useDispatch } from "react-redux";
import { whichBand } from "../../../functions/whichBand";
import { changeWord } from "../../../store/slices/textSlice";
import DialogBox from "../DialogBox";
import { Fragment } from "react";
/**
 * @description
 * Dialog box component used to replace a selected word with one of its synonyms.
 * 
 * ### Redux Store Interaction
 * The component uses the following parts of the Redux store:
 * - `bandsSlice.bands`: An array of band objects used here to determine the colour of synonyms based on their rank.
 *
 * The component dispatches the following Redux actions:
 * - `changeWord`: Action to update the selected word in the Redux store.
 * 
 *
 * @component
 * @param {Object} props - The props for SynonymReplacer.
 * @param {boolean} props.active - Whether the dialog box is active.
 * @param {Function} props.onClose - Function to close the dialog box.
 * @param {Object} props.selectedWord - The currently selected word and its details.
 * @param {number} props.selectedWord.index - The index of the selected word.
 * @param {string} props.selectedWord.word - The selected word.
 * @param {string} props.selectedWord.colour - The colour of the selected word.
 * @param {Array} props.selectedWord.synonyms - The list of synonyms for the selected word.
 *
 * @example
 * const selectedWord = {
 *   index: 1,
 *   word: 'example',
 *   colour: 'blue',
 *   synonyms: [
 *     { synonym: 'sample', rank: 1, lemma: 'sample' },
 *     { synonym: 'instance', rank: 2, lemma: 'instance' },
 *   ]
 * };
 * return (
 *   <SynonymReplacer active={true} onClose={() => {}} selectedWord={selectedWord} />
 * )
 *

 */

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
          Replace <b style={{ color: colour }}>{word}</b> with one of its
          synonyms:
        </h1>
      }
      content={
        synonyms !== undefined &&
        synonyms.length > 0 && (
          <Fragment>
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
            <div className="yandex-link">
              <a
                href="https://tech.yandex.com/dictionary/"
                target="_blank"
                rel="noreferrer"
              >
                Powered by Yandex.Dictionary
              </a>
            </div>
          </Fragment>
        )
      }
    />
  );
};

export default SynonymReplacer;
