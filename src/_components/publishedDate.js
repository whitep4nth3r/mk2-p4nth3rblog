const DateUtils = require("../../lib/dateUtils");

function PublishedDate({ date, readingTime, isTalk, updatedDate }) {
  const timeSuffix = isTalk ? "watch time" : "read";

  return /* html */ `<div>
      <time
        dateTime="${DateUtils.formatDateForDateTime(date)}"
      >
        ${DateUtils.formatDateForDisplay(date)}
      </time>
      ${
        updatedDate
          ? `
          <span>
            <span>•</span>
            <p>
              <time dateTime="${DateUtils.formatDateForDateTime(updatedDate)}>Updated ${DateUtils.formatDateForDisplay(
              updatedDate,
            )}</time>
            </p>
          </span>`
          : ""
      }
      <span>•</span>
      <span>
        ${readingTime} min ${timeSuffix}
      </span>
    </div>`;
}

module.exports = PublishedDate;
