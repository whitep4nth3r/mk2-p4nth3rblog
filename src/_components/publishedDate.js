const DateUtils = require("../../lib/dateUtils");
const StopwatchIcon = require("../_components/svg/stopwatchIcon");
const CalendarIcon = require("../_components/svg/calendarIcon");
const LightningIcon = require("../_components/svg/lightningIcon");

function PublishedDate({ date, readingTime, isTalk, updatedDate }) {
  const timeSuffix = isTalk ? "watch time" : "read";

  return /* html */ `
  <div class="publishedDate">
      <p class="publishedDate__item">
      <span class="publishedDate__icon">${CalendarIcon()}</span>
      ${DateUtils.formatDateForDisplay(date)}
      </p>
      ${
        updatedDate
          ? `
        <p class="publishedDate__item">
          <span class="publishedDate__icon">${LightningIcon()}</span>
          Updated ${DateUtils.formatDateForDisplay(updatedDate)}\
        </p>`
          : ""
      }
      <p class="publishedDate__item">
        <span class="publishedDate__icon">${StopwatchIcon()}</span>
        ${readingTime} min ${timeSuffix}
      </p>
    </div>`;
}

module.exports = PublishedDate;
