// import { PlusIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadPreset } from "../../../../store/slices/frequencyBandsSlice";

const Preset = ({ preset, onClick, selectedPreset }) => {
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

    return (
        <button
            className="presetButton"
            onClick={(e) => {
                // dispatch(loadPreset(preset.name));
                onClick();
            }}
        >
            <div
                className={`preset ${
                    selectedPreset === preset.name ? "activePreset" : ""
                }`}
            >
                {bars}
            </div>
            <div className="presetText">{preset.name}</div>
        </button>
    );
};

export default Preset;
