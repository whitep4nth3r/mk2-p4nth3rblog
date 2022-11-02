const DateUtils = require("../../lib/dateUtils.js");

var md = require("markdown-it")({
  html: true,
});

//big to do on image optimisation }

const ActivityFeedItem = ({ title, date, description, image, link, type }) => {
  return `<div class="activityFeedItem">
      <h2>${title}</h2>
      <time>${DateUtils.formatDateForDisplay(date)}</time>

      ${
        description
          ? `
      ${md.render(description)}
      `
          : ""
      }
      ${
        link
          ? `
      <a href="${link}" target="_blank">here is the link</a>`
          : ""
      }
        
      ${
        image
          ? `
    <img src="${image.url}" alt"${image.description}" />`
          : ""
      }

  </div>`;
};

module.exports = ActivityFeedItem;
