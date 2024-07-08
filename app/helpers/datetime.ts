export function getDatetimePlusOneHourGMT() {
  const currentGmtTime = new Date();

  const oneHourLater = new Date(currentGmtTime.getTime() + 3600 * 1000);

  return oneHourLater;
}
