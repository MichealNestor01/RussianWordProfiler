// import { PlusIcon } from "@heroicons/react/24/solid";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadPreset } from "../../../../store/slices/frequencyBandsSlice";
import {
    ArrowUpTrayIcon,
    FolderArrowDownIcon,
} from "@heroicons/react/24/outline";

const Preset = ({ preset, onClick, selectedPreset }) => {
    // const name =
    //     preset.name === "Current Preset" || preset.name === "Upload New Preset"
    //         ? ""
    //         : preset.name;
    const name = preset.name;
    const [presetClass, setPresetClass] = useState(
        `preset ${preset.name === "Save Current Preset" ? "currentPreset" : ""}`
    );

    let content = <Fragment />;
    if (preset.name === "Save Current Preset") {
        content = (
            <div className="currentPresetButton">
                <FolderArrowDownIcon />
                {/* <p>Save current preset</p> */}
            </div>
        );
    } else if (preset.name === "Upload New Preset") {
        content = (
            <div className="currentPresetButton">
                <ArrowUpTrayIcon />
                {/* <p>Upload a preset file</p> */}
            </div>
        );
    }

    let bars = [];

    const highestVal = Math.log10(52063);
    const lowestVal = 1;
    let prevTop = 1;
    for (let i = 0; i < preset.bands.length; i++) {
        const { top, colour } = preset.bands[i];
        let difference = top - prevTop;
        let barHeight = Math.log10((lowestVal / highestVal) * difference);

        bars.push(
            <div
                key={"preset_bar_" + i}
                className="presetBar"
                style={{
                    height: barHeight * 20 + "%",
                    backgroundColor: colour,
                }}
            ></div>
        );
        prevTop = top;
    }

    useEffect(() => {
        if (preset.name != "Save Current Preset") {
            setPresetClass(
                `preset ${selectedPreset === preset.name ? "activePreset" : ""}`
            );
        }
    }, [selectedPreset]);

    return (
        <button className="presetButton" onClick={onClick}>
            <div className={presetClass}>
                {bars}
                {content}
            </div>

            <div className="presetText">{name}</div>
        </button>
    );
};

export default Preset;
