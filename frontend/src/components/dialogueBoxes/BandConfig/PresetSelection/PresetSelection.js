import Preset from "./Preset";

const PresetSelection = () => {
    return (
        <div className="presetOptionsContainer">
            <h2>Ready-Made Presets</h2>

            <div className="presetContainer">
                <Preset />
                <Preset />
                <Preset />
            </div>

            <h2>Presets uploaded from this device</h2>
            <div className="presetContainer">
                <Preset />
                <Preset />
            </div>
        </div>
    );
};

export default PresetSelection;
