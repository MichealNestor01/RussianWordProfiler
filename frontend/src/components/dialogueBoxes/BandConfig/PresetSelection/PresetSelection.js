import { useSelector } from "react-redux";
// import frequencyBandsSlice from "../../../../store/slices/frequencyBandsSlice";
import Preset from "./Preset";
import DialogBox from "../../DialogBox";

const PresetSelection = ({ active, onClose }) => {
    const defaultPresets = useSelector((state) => state.bandsSlice.presets);

    const defaultPresetDivs = defaultPresets.map((preset) => {
        return <Preset preset={preset} onClose={onClose} />;
    });

    return (
        <DialogBox
            active={active}
            onClose={onClose}
            header={<h1>Band Preset Selector</h1>}
            content={
                <div className="presetOptionsContainer">
                    <h2>Ready-Made Presets</h2>

                    <div className="presetContainer">{defaultPresetDivs}</div>

                    <h2>Presets uploaded from this device</h2>
                    <div className="presetContainer">
                        {/* <Preset /> */}
                        {/* <Preset /> */}
                    </div>
                </div>
            }
        />
    );
};

export default PresetSelection;
