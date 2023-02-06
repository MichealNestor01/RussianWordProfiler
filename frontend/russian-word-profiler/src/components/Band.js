import { Fragment, useState } from "react";
import { ChromePicker } from "react-color";

const Band = ({ id, startTop, startColour, change }) => {
  const [colour, setColour] = useState(startColour);
  const [top, setTop] = useState(startTop);
  const [showPicker, setShowPicker] = useState(false);

  const changeHandler = (c) => {
    setColour(c.hex);
    change({ type: "change_colour", target: id, colour: c.hex });
  };

  return showPicker ? (
    <Fragment>
      <ChromePicker color={colour} onChange={(c) => changeHandler(c)} />
      <h1 className="close-button" onClick={() => setShowPicker(!showPicker)}>
        X
      </h1>
    </Fragment>
  ) : (
    <Fragment>
      <div
        className="band-colour"
        style={{ backgroundColor: colour }}
        onClick={() => setShowPicker(!showPicker)}
      />
      <h2>{id > 0 ? top : `Top ${top}`}</h2>
    </Fragment>
  );
};

export default Band;
