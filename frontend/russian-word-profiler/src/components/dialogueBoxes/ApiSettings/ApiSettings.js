import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setShowApiConfig } from "../../../store/textSlice";
import FileUpload from "../../generic/FileUpload";

const ApiSettings = () => {
  const dispatch = useDispatch();

  return (
    <motion.div
      initial={{ opacity: 0, y: "-200px", x: "700px" }}
      animate={{ opacity: 1, y: "-240px", x: "700px" }}
      exit={{ opacity: 0, y: "-200px", x: "700px" }}
      transition={{ duration: 0.2 }}
      className="wordEditor"
    >
      <div className="top">
        <h2>API Settings</h2>
        <div
          className="closeButton"
          onClick={() => {
            dispatch(setShowApiConfig(false));
          }}
        >
          x
        </div>
      </div>
      <h1>Upload stopwords</h1>
      <FileUpload />
    </motion.div>
  );
};

export default ApiSettings;
