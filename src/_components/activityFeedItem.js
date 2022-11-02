const DateUtils = require("../../lib/dateUtils.js");
const VideoEmbed = require("../_components/videoEmbed");
const TweetEmbed = require("../_components/tweetEmbed");

var md = require("markdown-it")({
  html: true,
});

//big to do on image optimisation

const ActivityFeedItem = ({ item }) => {
  const heading = item.title || item.name;

  return `<div class="activityFeedItem">
      <h2>${heading}</h2>
      <time>${DateUtils.formatDateForDisplay(item.date)}</time>

      ${item.type === "tweet" ? TweetEmbed({ tweetUrl: item.tweetEmbed.tweetUrl }) : ""}
      ${item.type === "youtube" ? VideoEmbed({ embedUrl: item.videoEmbed.embedUrl, title: item.videoEmbed.title }) : ""}


      ${
        item.description
          ? `
      ${md.render(item.description)}
      `
          : ""
      }
      ${
        item.link
          ? `
      <a href="${item.link}" target="_blank">here is the link</a>`
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
