import { useReducer } from "react";
import BandsSelector from "./BandsSelector";
import FormattedOutput from "./FormattedOutput";

function statisticsReducer(state, action) {
  const newState = [...state];
  return newState.filter((stat) => {
    if (stat.id === action.target) {
      stat.count = action.count;
      return stat;
    }
    return stat;
  });
}

function textFormatReducer(state, action) {
  switch (action.type) {
    case "add_paragraph_end":
      if (state.lineBreaks.includes(action.index)) {
        return state;
      }
      return { ...state, lineBreaks: [...state.lineBreaks, action.index] };
    case "set_line_breaks":
      return { ...state, lineBreaks: action.new };
    default:
      return state;
  }
}

const colourBandReducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "change_colour":
      return state.map((band) => {
        if (band.id === action.target) {
          return { ...band, colour: action.colour };
        }
        return band;
      });
    default:
      return state;
  }
};

function MainEditor({ text, setText, wordData, placeholder = "Text Here." }) {
  const [textFormat, textFormatDispatch] = useReducer(textFormatReducer, {
    lineBreaks: [],
  });

  const [statistics, dispatchStatistics] = useReducer(statisticsReducer, [
    { id: "words", text: "WORDS", count: 0 },
    { id: "chars", text: "CHARACTERS", count: 0 },
    { id: "sents", text: "SENTENCES", count: 0 },
    { id: "paras", text: "PARAGRAPHS", count: 0 },
  ]);

  const [colourBands, dispatchColourBands] = useReducer(colourBandReducer, [
    { id: 0, top: 1000, colour: "#FF0000" },
    { id: 1, top: 2500, colour: "#07BD14" },
    { id: 2, top: 5000, colour: "#0804D4" },
    { id: 3, top: "rest", colour: "#F008D8" },
  ]);

  // recalculate text stats after each update:
  const textChangeHandler = (e) => {
    // deal with scroll height
    // deal with text and statistics
    setText(e.target.value);
    const txt = e.target.value;
    let newLineBreaks = [];
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
    let paragraphs = characters > 0 ? 1 : 0;
    let wordCounter = 0;
    let prevChar = "";
    txt.split("").forEach((char, index) => {
      if (char === "." || char === "?" || char === "!") {
        sentences++;
      } else if (char === "\n" && prevChar !== char) {
        paragraphs++;
        // line breaks gives the formatter information about where
        // to place line breaks.
        newLineBreaks.push(wordCounter + newLineBreaks.length);
      }
      if (index > 0) {
        if (char === " " && prevChar !== " " && prevChar !== "\n") {
          wordCounter++;
        }
      }
      prevChar = char;
    });
    textFormatDispatch({ type: "set_line_breaks", new: newLineBreaks });
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
          <FormattedOutput
            text={text}
            wordData={wordData}
            textFormat={textFormat}
            colourBands={colourBands}
          />
        </div>
      </section>
      <section className="bands-container">
        <BandsSelector colourBands={colourBands} dispatchColourBands={dispatchColourBands} />
      </section>
    </section>
  );
}

export default MainEditor;
//
