// import { PlusIcon } from "@heroicons/react/24/solid";

import { difference } from "three/examples/jsm/nodes/Nodes.js";

const Preset = () => {
    let bands = [1000, 2000, 3000, 4000, 5000, 6000, 52063];
    let colours = [
        "#ff0000",
        "#ff8000",
        "#ffff00",
        "#80ff00",
        "#00ff00",
        "#00ff80",
        "#00ffff",
        "#0080ff",
        "#0000ff",
        "#8000ff",
        "#ff00ff",
        "#ff0080",
    ];

    let bars = [];

    const highest = Math.log10(52063);
    const lowest = 1;

    for (let i = 1; i < bands.length; i++) {
        let difference = bands[i] - bands[i - 1];
        let barHeight = (lowest / highest) * Math.log10(difference);
        barHeight *= 50;

        bars.push(
            <div
                key={i}
                className="presetBar"
                style={{
                    height: barHeight + "%",
                    backgroundColor: colours[i],
                }}
            ></div>
        );
    }

    return (
        <div className="presetButton">
            <div className="preset">{bars}</div>
            <div className="presetText">Preset #1</div>
        </div>
    );
};

export default Preset;
