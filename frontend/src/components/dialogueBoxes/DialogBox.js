import { motion, AnimatePresence } from "framer-motion";
import {
    fadeAnimation,
    scaleAnimation,
} from "../../framer-defaults/animations";
import XIcon from "../XIcon";

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
