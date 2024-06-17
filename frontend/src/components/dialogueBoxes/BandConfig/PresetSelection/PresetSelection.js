import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
    loadPreset,
    addNewPreset,
    deletePreset,
} from "../../../../store/slices/frequencyBandsSlice";
// import frequencyBandsSlice from "../../../../store/slices/frequencyBandsSlice";
import Preset from "./Preset";
import DialogBox from "../../DialogBox";
import InputWithValidation from "../../../generic/InputWithValidation";

const PresetSelection = ({ active, onClose }) => {
    const dispatch = useDispatch();
    const { presets, bands } = useSelector((state) => state.bandsSlice);
    const [selectedPreset, setSelectedPreset] = useState("");
    const [currentPreset, setCurrentPreset] = useState({});
    const [currentPresetDiv, setCurrentPresetDiv] = useState({});
    const [showSaveCurrentPreset, setShowSaveCurrentPreset] = useState(false);
    const [proposedName, setProposedName] = useState("");
    const [isAllowedName, setIsAllowedName] = useState(true);

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
                    setShowSaveCurrentPreset(true);
                    setSelectedPreset("");
                }}
                selectedPreset={selectedPreset}
            />
        );
        setCurrentPreset(tempCurrentPreset);
    }, [bands, selectedPreset, setCurrentPreset]);

    const updateProposedName = (val) => {
        const presetNames = [
            "Current Preset",
            "Upload New Preset",
            ...presets.map((preset) => preset.name),
        ];
        setProposedName(val);
        if (presetNames.includes(val)) {
            setIsAllowedName(false);
        } else {
            setIsAllowedName(true);
        }
    };

    const downloadSelectedPreset = () => {
        if (selectedPreset === "") {
            return;
        }
        console.log("Download Selected Preset");
    };

    const loadSelectedPreset = () => {
        if (selectedPreset === "") {
            return;
        }
        dispatch(loadPreset(selectedPreset));
        onClose();
    };

    const deleteSelectedPreset = () => {
        if (
            selectedPreset !== "" &&
            presets
                .filter((preset) => !preset.isDefault)
                .map((preset) => preset.name)
                .includes(selectedPreset)
        ) {
            dispatch(deletePreset(selectedPreset));
        }
    };

    const saveCurrentPreset = () => {
        if (isAllowedName && proposedName !== "") {
            dispatch(addNewPreset({ ...currentPreset, name: proposedName }));
            setShowSaveCurrentPreset(false);
        }
    };

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
                            ...addedPresetDivs,
                            currentPresetDiv,
                            addNewPresetDiv,
                        ]}
                    </div>

                    <div className="presetButtonsContainer">
                        {/*prettier-ignore*/}
                        <button className={selectedPreset !== "" ? "selectable" : ""} onClick={downloadSelectedPreset}>
                            Download Selected Preset
                        </button>
                        {/*prettier-ignore*/}
                        <button className={selectedPreset !== "" ? "selectable" : ""} onClick={loadSelectedPreset}>
                            Load Selected Preset
                        </button>
                        <button
                            className={
                                selectedPreset !== "" &&
                                presets
                                    .filter((preset) => !preset.isDefault)
                                    .map((preset) => preset.name)
                                    .includes(selectedPreset)
                                    ? "selectable"
                                    : ""
                            }
                            onClick={deleteSelectedPreset}
                        >
                            Delete Selected Preset
                        </button>
                        <InputWithValidation
                            active={showSaveCurrentPreset}
                            onClose={() => setShowSaveCurrentPreset(false)}
                            text={proposedName}
                            updateText={updateProposedName}
                            isValid={isAllowedName}
                            title="Save Current Preset"
                            placeholder="Preset Name Here"
                            onCancel={() => setShowSaveCurrentPreset(false)}
                            onSave={saveCurrentPreset}
                        />
                    </div>
                </div>
            }
        />
    );
};

export default PresetSelection;
