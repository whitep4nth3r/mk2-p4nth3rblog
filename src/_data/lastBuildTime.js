const DateUtils = require("../../lib/dateUtils");

module.exports = function () {
  const date = new Date();
  const lastBuildDay = DateUtils.getDayFromTime(date);
  const lastBuildDate = DateUtils.formatDateForDisplay(date);
  const lastBuildTime = DateUtils.getTimeFromTime(date);

  return `${lastBuildDay} ${lastBuildDate} ${lastBuildTime}`;
};
