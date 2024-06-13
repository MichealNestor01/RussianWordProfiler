import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { closeActiveDialogue } from "../../store/slices/siteStateSlice";
import XIcon from "../XIcon";

const DialogBox = ({ header, content, active, onClose }) => {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="dialogBackground"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="dialogBox"
          >
            <div className="headerContainer">
              {header}
              <button
                className="closeButton"
                viewBox="0 0 24 24"
                onClick={onClose}
              >
                <XIcon className="closeButtonIcon" />
              </button>
            </div>
            {content}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DialogBox;
