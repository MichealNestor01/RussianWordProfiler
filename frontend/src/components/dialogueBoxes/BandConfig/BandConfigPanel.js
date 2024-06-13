import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Band from "./Band";
import NewBand from "./NewBand";
import DialogBox from "../DialogBox"
import {useSelector, useDispatch } from "react-redux";
import {SwatchIcon, CloudArrowDownIcon, CloudArrowUpIcon} from "@heroicons/react/24/solid"
import { saveBands, setDefaultBands } from "../../../store/slices/frequencyBandsSlice"

// Wrap the band config panel in a dialog box.
// We add an onclose that saves the configuration when closing the dialog box.
const BandConfigPanel = ({ active, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const dispatch = useDispatch();
  const bands = useSelector((state) => state.bandsSlice.bands);

  const saveConfig = () => {
    dispatch(saveBands());
  };
  const resetDefault = () => {
    dispatch(setDefaultBands());
  };

  const [showPresets, setShowPresets] = useState(false);

  return (
    <DialogBox
      header={<h1>Band Configuration</h1>}
      active={active}
      onClose={onClose}
      content={
        <Fragment>
          {Object.keys(bands).map((band) => {
            return (
              <Band
                key={band}
                id={band}
                colour={bands[band].colour}
                top={bands[band].topVal}
                bottom={bands[band].bottomVal}
              />
            );
          })}

          <NewBand />

          <div className="orDivider">
            <div className="divider"></div>
            <p>OR</p>
            <div className="divider"></div>
          </div>

          <div className="bandConfigOptions">
            <button onClick={() => setShowPresets(true)}>
              <SwatchIcon className="configIcon" />
              Use Ready-Made Presets
            </button>
            <button>
              <CloudArrowDownIcon className="configIcon" />
              Save current preset to local file
            </button>
            <button>
              <CloudArrowUpIcon className="configIcon" />
              Load a preset from a local file
            </button>
          </div>
          <DialogBox
            active={showPresets}
            onClose={() => setShowPresets(false)}
            header={<h1>Band Preset Selector</h1>}
            content={<p>Select a preset:</p>}
          />
        </Fragment>
      }
    />
  );
};

export default BandConfigPanel;
