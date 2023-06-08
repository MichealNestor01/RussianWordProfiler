import { AnimatePresence } from "framer-motion";
import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreaks, setText } from "../../store/slices/textSlice";
import BandsBar from "./BandsBar";
import FormattedOutput from "./FormattedOutput";
import WordEditor from "../dialogueBoxes/WordEditor/WordEditor";

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

function MainEditor({ placeholder = "Text Here." }) {
  const dispatch = useDispatch();
  const activeWindow = useSelector((state) => state.siteState.activeWindow);
  const text = useSelector((state) => state.text.text);
  const [statistics, dispatchStatistics] = useReducer(statisticsReducer, [
    { id: "words", text: "WORDS", count: 179 },
    { id: "chars", text: "CHARACTERS", count: 1369 },
    { id: "sents", text: "SENTENCES", count: 12 },
    { id: "paras", text: "PARAGRAPHS", count: 4 },
  ]);

  // recalculate text stats after each update:
  const textChangeHandler = (e) => {
    dispatch(setText(e.target.value));
    const txt = e.target.value;
    const newLineBreaks = [];
    const newParagraphBreaks = [];
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
    // calculate sentences, words, and paragraphs:
    let sentences = 0;
    let paragraphs = 0;

    // count the number of sentences
    let sentenceMatches = txt.match(/[\.\?!]/g);
    if (sentenceMatches) {
      sentences = sentenceMatches.length;
    }

    // count the number of paragraphs
    let paragraphMatches = txt.split(/\n\s*\n/);
    if (paragraphMatches) {
      paragraphs = paragraphMatches.length;
    }

    // get new line breaks
    let wordCounter = 0;
    let prevChar = "";
    txt.split("").forEach((char) => {
      if (char === "\n") {
        if (prevChar !== "\n") {
          newLineBreaks.push(wordCounter);
        } else {
          newParagraphBreaks.push(wordCounter);
          newLineBreaks.pop();
        }
      }
      if (char === " " && prevChar !== " " && prevChar !== "\n") {
        wordCounter++;
      }
      prevChar = char;
    });
    dispatch(setBreaks({ lineBreaks: newLineBreaks, paragraphBreaks: newParagraphBreaks }));
    dispatchStatistics({ target: "words", count: wordCount });
    dispatchStatistics({ target: "sents", count: sentences });
    dispatchStatistics({ target: "paras", count: paragraphs });
  };

  return (
    <section className="text-input card">
      <section className="stats-container">
        {statistics.map((stat, index) => {
          return (
            <div className="stat" key={stat.text}>
              {index < statistics.length - 1 && <div className="right-border" />}
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
      <AnimatePresence>{activeWindow === "words" && <WordEditor />}</AnimatePresence>
    </section>
  );
}

export default MainEditor;
