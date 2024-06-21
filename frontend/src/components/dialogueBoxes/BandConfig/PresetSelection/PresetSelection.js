import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import {
  loadPreset,
  addNewPreset,
  deletePreset,
} from "../../../../store/slices/frequencyBandsSlice";
// import frequencyBandsSlice from "../../../../store/slices/frequencyBandsSlice";
import Preset from "./Preset";
import DialogBox from "../../DialogBox";
import InputWithValidation from "../../../generic/InputWithValidation";
import { downloadJSON } from "../../../../functions/downloadJSON";
import { handleJsonUpload } from "../../../../functions/uploadJSON";
import { validatePresetJson } from "../../../../functions/validatePresetJson";

import {
  ArrowDownTrayIcon,
  TrashIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";

/**
 * @description
 * Component for displaying a brand preset
 *
 * @component
 * @param {Object} props - The props for preset selection menu.
 * @param {bool} props.active - Whether the dialog box should be open.
 * @param {Function} props.onClose - The function to execute on dialog box close.
 * @param {Object} props.currentPreset - Stores the preset object for the current band layout.
 * @param {Function} props.setCurrentPreset - Function to change the current preset.
 *
 * @example
 * return (
 *   <PresetSelection
 *      active={showPresets}
 *        onClose={() => setShowPresets(false)}
 *       currentPreset={currentPreset}
 *      setCurrentPreset={setCurrentPreset}
 * />
 * )
 */
const PresetSelection = ({
  active,
  onClose,
  currentPreset,
  setCurrentPreset,
}) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { presets, bands } = useSelector((state) => state.bandsSlice);
  const [selectedPreset, setSelectedPreset] = useState("");
  const [currentPresetDiv, setCurrentPresetDiv] = useState({});
  const [showSaveCurrentPreset, setShowSaveCurrentPreset] = useState(false);
  const [proposedName, setProposedName] = useState("");
  const [isAllowedName, setIsAllowedName] = useState(true);

  const addNewPresetDiv = (
    <Preset
      key={"Upload New Preset"}
      preset={{ name: "Upload New Preset", isDefault: false, bands: [] }}
      onClick={() => {
        fileInputRef.current.click();
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
    const { tempDefaultPresetDivs, tempAddedPresetDivs } = createPresetDivs();
    setDefaultPresetDivs(tempDefaultPresetDivs);
    setAddedPresetDivs(tempAddedPresetDivs);
  }, [presets, selectedPreset]);

  useEffect(() => {
    const tempCurrentPreset = {
      isDefault: false,
      name: "Save Current Preset",
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
      "Save Current Preset",
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
    downloadJSON(
      presets.filter((preset) => preset.name === selectedPreset)[0],
      "Russian Word Profiler Preset Configuration File",
      `RussianWordProfilerPreset-${selectedPreset}.json`
    );
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
          <div className="containerMaxHeight">
            <h2>Ready-Made Presets</h2>
            <div className="presetContainer">{defaultPresetDivs}</div>

            <h2>Other Presets</h2>
            <div className="presetContainer">
              {[currentPresetDiv, addNewPresetDiv, ...addedPresetDivs]}
            </div>
          </div>

          <div className="selectedOptionsContainer">
            <h2>Selected Preset Options</h2>
            <div className="presetButtonsContainer">
              {/*prettier-ignore*/}
              <button className={selectedPreset !== "" ? "selectable" : ""} onClick={loadSelectedPreset}>
                            <CheckIcon/> Use Preset 
                        </button>
              {/*prettier-ignore*/}
              <button className={selectedPreset !== "" ? "selectable" : ""} onClick={downloadSelectedPreset}>
                            <ArrowDownTrayIcon/> Download
                        </button>
              <button
                className={
                  selectedPreset !== "" &&
                  presets
                    .filter((preset) => !preset.isDefault)
                    .map((preset) => preset.name)
                    .includes(selectedPreset)
                    ? "selectable delete"
                    : ""
                }
                onClick={deleteSelectedPreset}
              >
                <TrashIcon /> Delete
              </button>
              <InputWithValidation
                active={showSaveCurrentPreset}
                onClose={() => setShowSaveCurrentPreset(false)}
                text={proposedName}
                updateText={updateProposedName}
                isValid={isAllowedName}
                title="Save Current Preset"
                placeholder="Give the Preset a Name"
                onCancel={() => setShowSaveCurrentPreset(false)}
                onSave={saveCurrentPreset}
              />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              style={{ display: "none" }}
              onChange={(event) =>
                handleJsonUpload(event, validatePresetJson, (json) => {
                  setCurrentPreset(json);
                  dispatch(addNewPreset(json));
                  dispatch(loadPreset(json.name));
                })
              }
            />
          </div>
        </div>
      }
    />
  );
};

export default PresetSelection;
