const DateUtils = require("../../lib/dateUtils.js");
const VideoEmbed = require("../_components/videoEmbed");
const TweetEmbed = require("../_components/tweetEmbed");
const CalendarIcon = require("../_components/svg/calendarIcon");

var md = require("markdown-it")({
  html: true,
});

//big to do on image optimisation

function title({ title, link }) {
  if (link) {
    return `<a href="${link}" target="_blank"><h2>${title}</h2></a>`;
  } else {
    return `<h2>${title}</h2>`;
  }
}

const ActivityFeedItem = ({ item }) => {
  const heading = item.title || item.name;

  return `<div class="activityFeed__item">
    <div class="activityFeed__meta">
      <span class="activity__metaIcon">${CalendarIcon()}</span>
      <span class="activity__metaText">${DateUtils.formatDateForDisplay(item.date)}</span>
    </div>
    ${title({ title: heading, link: item.link })}

      ${item.type === "tweet" ? TweetEmbed({ tweetUrl: item.tweetEmbed.tweetUrl }) : ""}
      ${
        item.type === "youtube"
          ? VideoEmbed({ embedUrl: item.videoEmbed.embedUrl, title: item.videoEmbed.title, showTitle: false })
          : ""
      }

      ${
        item.description
          ? `
      ${md.render(item.description)}
      `
          : ""
      }
    
      ${
        item.image
          ? `
    <img src="${item.image.url}" alt"${item.image.description}" />`
          : ""
      }

  </div><hr />`;
};

module.exports = ActivityFeedItem;
