import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
// import frequencyBandsSlice from "../../../../store/slices/frequencyBandsSlice";
import Preset from "./Preset";
import DialogBox from "../../DialogBox";

const PresetSelection = ({ active, onClose }) => {
    const { presets, bands } = useSelector((state) => state.bandsSlice);
    const [selectedPreset, setSelectedPreset] = useState("Current Preset");
    const [currentPreset, setCurrentPreset] = useState({});
    const [currentPresetDiv, setCurrentPresetDiv] = useState({});

    const createPresetDivs = () => {
        const tempDefaultPresetDivs = [];
        const tempAddedPresetDivs = [];
        presets.forEach((preset) => {
            const presetDiv = (
                <Preset
                    key={preset.name}
                    preset={preset}
                    onClick={() => setSelectedPreset(preset.name)}
                    selectedPreset={selectedPreset}
                />
            );
            if (preset.isDefault) {
                tempDefaultPresetDivs.push(presetDiv);
            } else {
                tempAddedPresetDivs.push(presetDiv);
            }
        });
        return { tempDefaultPresetDivs, tempAddedPresetDivs };
    };

    const [addedPresetDivs, setAddedPresetDivs] = useState([]);
    const [defaultPresetDivs, setDefaultPresetDivs] = useState([]);

    useEffect(() => {
        const { tempDefaultPresetDivs, tempAddedPresetDivs } =
            createPresetDivs();
        setDefaultPresetDivs(tempDefaultPresetDivs);
        setAddedPresetDivs(tempAddedPresetDivs);
    }, [presets, selectedPreset]);

    useEffect(() => {
        console.log("THIS IS BANDS: ", bands);
        const tempCurrentPreset = {
            isDefault: false,
            name: "Current Preset",
            bands: Object.keys(bands).map((band) => ({
                top: bands[band].topVal,
                colour: bands[band].colour,
            })),
        };
        setCurrentPresetDiv(
            <Preset
                key={tempCurrentPreset.name}
                preset={tempCurrentPreset}
                onClick={() => setSelectedPreset(tempCurrentPreset.name)}
                selectedPreset={selectedPreset}
            />
        );
        setCurrentPreset(tempCurrentPreset);
    }, [bands, selectedPreset, setCurrentPreset]);

    return (
        <DialogBox
            active={active}
            onClose={onClose}
            header={<h1>Band Preset Selector</h1>}
            content={
                <div className="presetOptionsContainer">
                    <h2>Ready-Made Presets</h2>

                    <div className="presetContainer">{defaultPresetDivs}</div>

                    <h2>Other Presets</h2>
                    <div className="presetContainer">
                        {[currentPresetDiv, ...addedPresetDivs]}
                    </div>
                </div>
            }
        />
    );
};

export default PresetSelection;
