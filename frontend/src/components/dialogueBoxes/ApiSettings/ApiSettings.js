import FileUpload from "../../generic/FileUpload";
import DialogBox from "../DialogBox";
import { Fragment } from "react";

const ApiSettings = ({ active, onClose }) => {
  return (
    <DialogBox
      active={active}
      onClose={onClose}
      header={<h1>Api Settings</h1>}
      content={
        <Fragment>
          <div className="top">
            <h2>API Settings</h2>
            <div className="closeButton" onClick={onClose}>
              x
            </div>
          </div>
          <h1>Upload stopwords</h1>
          <FileUpload />
        </Fragment>
      }
    />
  );
};

export default ApiSettings;
