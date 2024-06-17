export const validatePresetJson = (json) => {
    if (
        typeof json.name === "string" &&
        Array.isArray(json.bands) &&
        json.bands.every(
            (band) =>
                typeof band.top === "number" && typeof band.colour === "string"
        )
    ) {
        return true;
    }
    return false;
};
