import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setText } from "../../store/slices/textSlice";
import BandsBar from "./BandsBar";
import FormattedOutput from "./FormattedOutput";

function statisticsReducer(state, action) {
  const newState = [...state];
  return newState.filter((stat) => {
    // all of the stats are just numbers, so this
    // if statement is enough to update them
    if (stat.id === action.target) {
      stat.count = action.count;
      return stat;
    }
    return stat;
  });
}

/**
 * @description
 * Main editor component for text input and analysis in the Russian Word Profiler.
 *
 * ### Redux Store Interaction
 * The component uses the following parts of the Redux store:
 * - `textSlice.text`: The current text input by the user.
 *
 * The component dispatches the following Redux actions:
 * - `setText`: Action to update the text input in the Redux store.
 *
 * @component
 * @param {Object} props - The props for MainEditor.
 * @param {string} [props.placeholder="Text Here."] - The placeholder text for the text input area.
 *
 * @example
 * return (
 *   <MainEditor placeholder="Enter your text here." />
 * )
 */
function MainEditor({ placeholder = "Text Here." }) {
  const dispatch = useDispatch();
  const text = useSelector((state) => state.text.text);
  const [statistics, dispatchStatistics] = useReducer(statisticsReducer, [
    { id: "words", text: "WORDS", count: 0 },
    { id: "chars", text: "CHARACTERS", count: 0 },
    { id: "sents", text: "SENTENCES", count: 0 },
    { id: "paras", text: "PARAGRAPHS", count: 0 },
  ]);

  // recalculate text stats after each update:
  const textChangeHandler = (e) => {
    const txt = e.target.value;
    dispatch(setText(txt));

    // calculate words:
    const wordCount = txt.split(" ").filter((word) => {
      if (word !== "") {
        return true;
      }
      return false;
    }).length;
    dispatchStatistics({ target: "words", count: wordCount });

    // calculate characters:
    let characters = txt.split("").length;
    dispatchStatistics({ target: "chars", count: characters });

    // calculate sentences and paragraphs:
    let sentences = 0;
    let paragraphs = 0;

    // count the number of sentences
    let sentenceMatches = txt.match(/[\.\?!]/g);
    if (sentenceMatches) {
      sentences = sentenceMatches.length;
    }
    dispatchStatistics({ target: "sents", count: sentences });

    // count the number of paragraphs
    let paragraphMatches = txt.split(/\n\s*\n/);
    if (paragraphMatches) {
      paragraphs = paragraphMatches.length;
    }
    dispatchStatistics({ target: "paras", count: paragraphs });
  };

  return (
    <section className="text-input card">
      <section className="stats-container">
        {statistics.map((stat, index) => {
          return (
            <div className="stat" key={stat.text}>
              {index < statistics.length - 1 && (
                <div className="right-border" />
              )}
              <h1 className="number">{stat.count}</h1>
              <p className="text">{stat.text}</p>
            </div>
          );
        })}
      </section>
      <section className="input-container">
        <textarea
          className="input main-text"
          value={text}
          onChange={textChangeHandler}
          placeholder={placeholder}
        />
        <div className="text-output main-text">
          <FormattedOutput />
        </div>
      </section>
      <section className="bands-container">
        <BandsBar />
      </section>
    </section>
  );
}

export default MainEditor;
