import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { closeActiveDialogue } from "../../store/slices/siteStateSlice";
import XIcon from "../XIcon";

const DialogBox = (props) => {
  const dispatch = useDispatch();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="dialogBackground"
    >
      <div className="dialogBox">
        <div className="headerContainer">
          {props.header}
          <button
            className="closeButton"
            viewBox="0 0 24 24"
            onClick={() => dispatch(closeActiveDialogue())}
          >
            <XIcon className="closeButtonIcon" />
          </button>
        </div>

        {props.content}
      </div>
    </motion.div>
  );
};

export default DialogBox;
