import { useReducer } from "react";

function reducer(state, action) {
  const newState = [...state];
  return newState.filter((stat) => {
    if (stat.id === action.target) {
      stat.count = action.count;
      return stat;
    }
    return stat;
  });
}

function TextInput({ text, setText, textFormatDispatch, placeholder = "Text Here." }) {
  const [state, dispatch] = useReducer(reducer, [
    { id: "words", text: "WORDS", count: 0 },
    { id: "chars", text: "CHARACTERS", count: 0 },
    { id: "sents", text: "SENTENCES", count: 0 },
    { id: "paras", text: "PARAGRAPHS", count: 0 },
  ]);

  // recalculate text stats after each update:
  const textChangeHandler = (e) => {
    setText(e.target.value);
    const txt = e.target.value;
    let newLineBreaks = [];
    // calculate words:
    const wordCount = txt.split(" ").filter((word) => {
      if (word !== "") {
        return word;
      }
    }).length;
    dispatch({ target: "words", count: wordCount });
    // calculate characters:
    let characters = txt.split("").length;
    dispatch({ target: "chars", count: characters });
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
    dispatch({ target: "sents", count: sentences });
    dispatch({ target: "paras", count: paragraphs });
  };

  return (
    <section className="text-input card">
      <section className="stats-container">
        {state.map((stat, index) => {
          return (
            <div className="stat" key={stat.text}>
              {index < state.length - 1 && <div className="right-border" />}
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
        <div className="top-border" />
      </section>
    </section>
  );
}

export default TextInput;
