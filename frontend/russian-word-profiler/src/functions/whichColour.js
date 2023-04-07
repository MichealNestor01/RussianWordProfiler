export const whichColour = (rank, bands) => {
  if (rank === -1) {
    return "";
  }
  for (let bandIndex = 0; bandIndex < bands.length; bandIndex++) {
    const band = bands[bandIndex];
    if (rank < band.top) {
      return band.colour;
    }
  }
};
