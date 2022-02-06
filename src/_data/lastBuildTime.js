const DateUtils = require("../../lib/dateUtils");

module.exports = function () {
  const date = new Date();
  const lastBuildDate = DateUtils.formatDateForDisplay(date);
  const lastBuildTime = DateUtils.getTimeFromTime(date);

  return `${lastBuildDate} ${lastBuildTime}`;
};
