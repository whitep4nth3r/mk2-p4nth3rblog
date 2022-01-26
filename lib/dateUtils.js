const DateUtils = {
  sortItemsByDate: function (a, b) {
    const a_timestamp = Date.parse(a.date);
    const a_date = new Date(a_timestamp);

    const b_timestamp = Date.parse(b.date);
    const b_date = new Date(b_timestamp);

    return b_date - a_date;
  },
  getMonthStringFromInt: function (int) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return months[int];
  },
  getDayStringFromInt: function (int) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[int];
  },
  addLeadingZero: function (num) {
    num = num.toString();
    while (num.length < 2) num = "0" + num;
    return num;
  },
  formatDateForDateTime: function (dateString) {
    const timestamp = Date.parse(dateString);
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${DateUtils.addLeadingZero(date.getMonth() + 1)}-${date.getDate()}`;
  },
  formatDateForDisplay: function (dateString) {
    const timestamp = Date.parse(dateString);
    const date = new Date(timestamp);
    return `${date.getDate()} ${DateUtils.getMonthStringFromInt(date.getMonth())} ${date.getFullYear()}`;
  },
  formatDateForEventDisplay: function (dateString, timeTbc) {
    const timestamp = Date.parse(dateString);
    const date = new Date(timestamp);

    const time = timeTbc
      ? "TBC"
      : `${DateUtils.addLeadingZero(date.getHours())}:${DateUtils.addLeadingZero(date.getMinutes())}`;

    return `${DateUtils.getDayStringFromInt(date.getDay())} ${date.getDate()} ${DateUtils.getMonthStringFromInt(
      date.getMonth(),
    )} ${date.getFullYear()} @ ${time}`;
  },
  formatDateForTwitchDisplay: function (dateString) {
    const timestamp = Date.parse(dateString);
    const date = new Date(timestamp);
    return `${DateUtils.getDayStringFromInt(date.getDay())} ${date.getDate()} ${DateUtils.getMonthStringFromInt(
      date.getMonth(),
    )} ${date.getFullYear()}`;
  },
  formatTwitchScheduleTimeSlot: function (startTimeString, endTimeString) {
    const startTimeStamp = Date.parse(startTimeString);
    const startDate = new Date(startTimeStamp);

    const endTimeStamp = Date.parse(endTimeString);
    const endDate = new Date(endTimeStamp);

    return `${startDate.getHours()}:${DateUtils.addLeadingZero(
      startDate.getMinutes(),
    )} - ${endDate.getHours()}:${DateUtils.addLeadingZero(endDate.getMinutes())}`;
  },
  getDateFromTime: function (startTimeString) {
    const startTimeStamp = Date.parse(startTimeString);
    const startDate = new Date(startTimeStamp);

    return DateUtils.addLeadingZero(startDate.getDate());
  },
  getMonthFromTime: function (startTimeString) {
    const startTimeStamp = Date.parse(startTimeString);
    const startDate = new Date(startTimeStamp);

    return DateUtils.getMonthStringFromInt(startDate.getMonth());
  },
  getDayFromTime: function (startTimeString) {
    const startTimeStamp = Date.parse(startTimeString);
    const startDate = new Date(startTimeStamp);

    return DateUtils.getDayStringFromInt(startDate.getDay());
  },
  getYearFromTime: function (startTimeString) {
    const startTimeStamp = Date.parse(startTimeString);
    const startDate = new Date(startTimeStamp);

    return startDate.getFullYear();
  },
  getMonthAndYearFromTime: function (startTimeString) {
    const startTimeStamp = Date.parse(startTimeString);
    const startDate = new Date(startTimeStamp);

    return DateUtils.getMonthStringFromInt(startDate.getMonth()) + " " + startDate.getFullYear();
  },
  getTimeFromTime: function (startTimeString) {
    const startTimeStamp = Date.parse(startTimeString);
    const startDate = new Date(startTimeStamp);

    return `${DateUtils.addLeadingZero(startDate.getHours())}:${DateUtils.addLeadingZero(startDate.getMinutes())}`;
  },
  makeForRss: function (dateString) {
    const day = DateUtils.getDayFromTime(dateString);
    const dayNumber = DateUtils.getDateFromTime(dateString);
    const monthAndYear = DateUtils.getMonthAndYearFromTime(dateString);
    const time = DateUtils.getTimeFromTime(dateString);

    //Wed, 02 Oct 2002 13:00:00 GMT
    return `${day}, ${dayNumber} ${monthAndYear} ${time}:00 GMT`;
  },
};

module.exports = DateUtils;
