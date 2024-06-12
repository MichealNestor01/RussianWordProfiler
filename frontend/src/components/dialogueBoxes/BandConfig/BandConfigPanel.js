import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Band from "./Band";
import NewBand from "./NewBand";
import DialogBox from "../DialogBox"
import {useSelector, useDispatch, useEffect } from "react-redux";
import {SwatchIcon, CloudArrowDownIcon, CloudArrowUpIcon} from "@heroicons/react/24/solid"
import { update } from "three/examples/jsm/libs/tween.module.js";


const BandConfig = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const dispatch = useDispatch();
  const bands = useSelector((state) => state.bandsSlice.bands);

  return (
    <Fragment>
      
    <AnimatePresence initial={false}>

    {Object.keys(bands).map((band) => { 
      return <motion.div
      initial={{opacity: 0, translateX: -50 }}
      animate={{opacity:1, translateX: 0 }}
      exit={{opacity:0, translateX: -50}}
      transition={{ duration: 0.2 }}
      key={band+"-container"}>
        <Band key={band} id={band} colour={bands[band].colour} top={bands[band].topVal} bottom={bands[band].bottomVal} />
      </motion.div>;
    })}
    </AnimatePresence>
    <NewBand />

    <div className="orDivider">
      <div className="divider"></div>
      <p>OR</p>
      <div className="divider"></div>
    </div>

    <div className="bandConfigOptions">
      <button><SwatchIcon className="configIcon"/>Use Ready-Made Presets</button>
      <button><CloudArrowDownIcon className="configIcon"/>Save current preset to local file</button>
      <button><CloudArrowUpIcon className="configIcon"/>Load a preset from a local file</button>
    </div>
    </Fragment>
  );
}


// Wrap the band config panel in a dialog box.
// We add an onclose that saves the configuration when closing the dialog box.
const BandConfigPanel = () => {
  return  (
    <DialogBox
      header={
        <h1>
          Band Configuration
        </h1>
      }
      content={<BandConfig />}
      
    />
  );
}

export default BandConfigPanel;
