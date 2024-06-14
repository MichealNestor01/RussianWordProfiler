import { motion, AnimatePresence } from "framer-motion";
import {
  fadeAnimation,
  scaleAnimation,
} from "../../framer-defaults/animations";
import { XMarkIcon } from "@heroicons/react/24/solid";

/**
 * @description
 * Generic dialog box component.
 *
 * @component
 * @param {Object} props - The props for DialogBox.
 * @param {boolean} props.active - Whether the dialog box is active.
 * @param {Function} props.onClose - Function to close the dialog box.
 * @param {JSX.Element} props.header - The header content of the dialog box.
 * @param {JSX.Element} props.content - The main content of the dialog box.
 *
 * @example
 * [showDialog, setShowDialog] = useState(false)
 *
 * return (
 *   <DialogBox
 *     active={showDialog}
 *     onClose={() => setShowDialog(false)}
 *     header={<h1>Header</h1>}
 *     content={<p>Content</p>}
 *   />
 * )
 */
const DialogBox = ({ header, content, active, onClose }) => {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          {...fadeAnimation}
          className="dialogBackground"
          onClick={onClose}
        >
          <motion.div
            {...scaleAnimation}
            className="dialogBox"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="headerContainer">
              {header}
              <button
                className="closeButton"
                viewBox="0 0 24 24"
                onClick={onClose}
              >
                <XMarkIcon className="closeButtonIcon" />
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
