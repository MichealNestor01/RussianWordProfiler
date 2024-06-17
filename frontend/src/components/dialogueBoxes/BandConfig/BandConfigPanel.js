import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scaleAnimation } from "../../../framer-defaults/animations";
import Band from "./Band";
import NewBand from "./NewBand";
import PresetSelection from "./PresetSelection/PresetSelection";
import DialogBox from "../DialogBox";
import { useSelector, useDispatch } from "react-redux";
import {
    SwatchIcon,
    CloudArrowDownIcon,
    CloudArrowUpIcon,
} from "@heroicons/react/24/solid";
import { saveBands } from "../../../store/slices/frequencyBandsSlice";

/**
 * @description
 * Component for configuring bands in a panel, wrapped in a dialog box. The configuration is saved when the dialog box is closed.
 *
 * ### Redux Store Interaction
 * The component uses the following parts of the Redux store:
 * - `bandsSlice.bands`: An array of band objects.
 *
 * The component dispatches the following Redux actions:
 * - `saveBands`: Action to save the current band configuration.
 *
 * @component
 * @param {Object} props - The props for BandConfigPanel.
 * @param {boolean} props.active - Whether the dialog box is active.
 * @param {Function} props.onClose - Function to close the dialog box.
 *
 * @example
 * return (
 *   <BandConfigPanel active={true} onClose={() => {}} />
 * )
 */
const BandConfigPanel = ({ active, onClose }) => {
    const dispatch = useDispatch();
    const bands = useSelector((state) => state.bandsSlice.bands);

    const [showPresets, setShowPresets] = useState(false);

    return (
        <DialogBox
            header={<h1>Band Configuration</h1>}
            active={active}
            onClose={() => {
                onClose();
                dispatch(saveBands());
            }}
            content={
                <Fragment>
                    <AnimatePresence initial={false}>
                        {Object.keys(bands).map((band) => {
                            return (
                                <motion.div
                                    {...scaleAnimation}
                                    key={band + "-container"}
                                >
                                    <Band
                                        key={band}
                                        id={band}
                                        colour={bands[band].colour}
                                        top={bands[band].topVal}
                                        bottom={bands[band].bottomVal}
                                    />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

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
                        content={<PresetSelection />}
                    />
                </Fragment>
            }
        />
    );
};

export default BandConfigPanel;
