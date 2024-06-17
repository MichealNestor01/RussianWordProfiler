import DialogBox from "../DialogBox";
import { Fragment } from "react";
import TextFileUpload from "../../generic/TextFileUpload";
/**
 * @description
 * Component for API settings dialog.
 *
 * @component
 *
 * @example
 * return (
 *   <ApiSettings />
 * )
 */
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
                    <TextFileUpload />
                </Fragment>
            }
        />
    );
};

export default ApiSettings;
