const DateUtils = require("../../lib/dateUtils");

function PublishedDate({ date, readingTime, isTalk, updatedDate }) {
  const timeSuffix = isTalk ? "watch time" : "read";
  const updated = updatedDate ? "Updated " : "";
  const displayDate = updatedDate || date;

  return /* html */ `
  <div class="publishedDate">
    <p class="publishedDate__item">
      <time class="dt-published" datetime="${DateUtils.formatDateForTimeElement(
        displayDate,
      )}"> ${updated}${DateUtils.formatDateForDisplay(displayDate)}</time>
    </p>
    <p class="publishedDate__item">
      ${readingTime} min ${timeSuffix}
    </p>
  </div>`;
}

module.exports = PublishedDate;
