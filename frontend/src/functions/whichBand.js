export function whichBand(rank, bands) {
    if (rank !== -1 && Object.keys(bands).length !== 0) {
        for (const [band, bandData] of Object.entries(bands)) {
            if (rank <= bandData.topVal) {
                return band;
            }
        }
    }
    return -1
}