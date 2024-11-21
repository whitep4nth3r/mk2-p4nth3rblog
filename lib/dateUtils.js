const DateUtils = {
  sortItemsByDateAsc(a, b) {
    const a_timestamp = Date.parse(a.date);
    const a_date = new Date(a_timestamp);

    const b_timestamp = Date.parse(b.date);
    const b_date = new Date(b_timestamp);

    return a_date - b_date;
  },
  sortItemsByDateDesc: function (a, b) {
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
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[int];
  },
  getDayStringFromIntShort: function (int) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[int];
  },
  addLeadingZero: function (num) {
    num = num.toString();
    while (num.length < 2) num = "0" + num;
    return num;
  },
  formatDateForTimeElement: function (dateString) {
    // YYYY-MM-DD HH:MM:SS
    const timestamp = Date.parse(dateString);
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${DateUtils.addLeadingZero(date.getMonth() + 1)}-${DateUtils.addLeadingZero(
      date.getDate(),
    )} ${DateUtils.addLeadingZero(date.getHours())}:${DateUtils.addLeadingZero(
      date.getMinutes(),
    )}:${DateUtils.addLeadingZero(date.getSeconds())}`;
  },
  formatDateForDisplay: function (dateString) {
    const timestamp = Date.parse(dateString);
    const date = new Date(timestamp);
    return `${date.getDate()} ${DateUtils.getMonthStringFromInt(date.getMonth())} ${date.getFullYear()}`;
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
  getShortDayFromTime: function (startTimeString) {
    const startTimeStamp = Date.parse(startTimeString);
    const startDate = new Date(startTimeStamp);

    return DateUtils.getDayStringFromIntShort(startDate.getDay());
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
    const day = DateUtils.getShortDayFromTime(dateString);
    const dayNumber = DateUtils.getDateFromTime(dateString);
    const monthAndYear = DateUtils.getMonthAndYearFromTime(dateString);
    const time = DateUtils.getTimeFromTime(dateString);
    const dateForTz = new Date(dateString);
    const timezone = dateForTz.getTimezoneOffset() === 0 ? "GMT" : "BST";

    //Wed, 02 Oct 2002 13:00:00 GMT
    return `${day}, ${dayNumber} ${monthAndYear} ${time}:00 ${timezone}`;
  },
};

module.exports = DateUtils;
