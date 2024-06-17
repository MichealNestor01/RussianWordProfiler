import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
// import frequencyBandsSlice from "../../../../store/slices/frequencyBandsSlice";
import Preset from "./Preset";
import DialogBox from "../../DialogBox";

const PresetSelection = ({ active, onClose }) => {
    const { presets, bands } = useSelector((state) => state.bandsSlice);
    const [selectedPreset, setSelectedPreset] = useState("");
    const [currentPreset, setCurrentPreset] = useState({});
    const [currentPresetDiv, setCurrentPresetDiv] = useState({});

    const addNewPresetDiv = (
        <Preset
            key={"Upload New Preset"}
            preset={{ name: "Upload New Preset", isDefault: false, bands: [] }}
            onClick={() => {
                console.log("UPLOAD NEW FILE");
                setSelectedPreset("");
            }}
            selectedPreset={selectedPreset}
        />
    );

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
                onClick={() => {
                    console.log("OPEN SAVE CURRENT MODAL");
                    setSelectedPreset("");
                }}
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
                        {[
                            currentPresetDiv,
                            addNewPresetDiv,
                            ...addedPresetDivs,
                        ]}
                    </div>

                    <div className="presetButtonsContainer">
                        <button>Download Selected Preset</button>
                        <button>Load Selected Preset</button>
                    </div>
                </div>
            }
        />
    );
};

export default PresetSelection;
