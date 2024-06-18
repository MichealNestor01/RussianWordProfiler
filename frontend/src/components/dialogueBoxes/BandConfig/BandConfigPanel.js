import { Fragment, useState, useEffect, useRef } from "react";
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
import {
    loadPreset,
    saveBands,
    addNewPreset,
} from "../../../store/slices/frequencyBandsSlice";
import { downloadJSON } from "../../../functions/downloadJSON";
import { getDatetimeString } from "../../../functions/getDatetimeString";
import { validatePresetJson } from "../../../functions/validatePresetJson";
import { handleJsonUpload } from "../../../functions/uploadJSON";

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
    const fileInputRef = useRef(null);
    const { bands, presets } = useSelector((state) => state.bandsSlice);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [showPresets, setShowPresets] = useState(false);
    const [currentPreset, setCurrentPreset] = useState({});

    useEffect(() => {
        const tempCurrentPreset = {
            isDefault: false,
            name: "Current Preset",
            bands: Object.keys(bands).map((band) => ({
                top: bands[band].topVal,
                colour: bands[band].colour,
            })),
        };
        setCurrentPreset(tempCurrentPreset);
    }, [bands, setCurrentPreset]);

    const downloadCurrentPreset = () => {
        const now = getDatetimeString();
        downloadJSON(
            { ...currentPreset, name: `Preset-${now}` },
            "Russian Word Profiler Preset Configuration File",
            `RussianWordProfilerPreset-${now}.json`
        );
    };

    const updateCurrentPreset = (preset) => {
        setCurrentPreset(preset);
        console.log(preset);
        dispatch(loadPreset(preset));
    };

    return (
        <DialogBox
            header={<h1>Band Configuration</h1>}
            active={active}
            onClose={() => {
                onClose();
                dispatch(saveBands());
                setActiveIndex(-1);
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
                                        setActiveIndex={setActiveIndex}
                                        activeIndex={activeIndex}
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

                        <button onClick={downloadCurrentPreset}>
                            <CloudArrowDownIcon className="configIcon" />
                            Save current preset to local file
                        </button>
                        <button onClick={() => fileInputRef.current.click()}>
                            <CloudArrowUpIcon className="configIcon" />
                            Load a preset from a local file
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".json"
                            style={{ display: "none" }}
                            onChange={(event) =>
                                handleJsonUpload(
                                    event,
                                    validatePresetJson,
                                    (json) => {
                                        setCurrentPreset(json);
                                        dispatch(addNewPreset(json));
                                        dispatch(loadPreset(json.name));
                                    }
                                )
                            }
                        />
                    </div>
                    <PresetSelection
                        active={showPresets}
                        onClose={() => setShowPresets(false)}
                        currentPreset={currentPreset}
                        setCurrentPreset={setCurrentPreset}
                    />
                </Fragment>
            }
        />
    );
};

export default BandConfigPanel;
