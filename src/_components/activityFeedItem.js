const DateUtils = require("../../lib/dateUtils.js");
const VideoEmbed = require("../_components/videoEmbed");
const TweetEmbed = require("../_components/tweetEmbed");
const CalendarIcon = require("../_components/svg/calendarIcon");

var md = require("markdown-it")({
  html: true,
});

function findImage(item) {
  switch (item.type) {
    case "talkSummary":
      return item.speakerDeckLink.image;
    case "talk":
      return item.speakerDeckLink.image;
    case "postSummary":
      return item.featuredImage || null;
    case "post":
      return item.featuredImage || null;
  }
}

function description(item) {
  if (item.description) {
    return `<div class="activityFeed__description">${md.render(item.description)}</div>`;
  }

  if (item.excerpt) {
    return `<div class="activityFeed__description"> 
      ${md.render(item.excerpt)}
      </div>
      `;
  }

  return "";
}

function image(image) {
  if (image) {
    return `<img 
          src="${image.url}?w=510" 
          alt="${image.description}"
          height="${image.height}"
          width="${image.width}"
          class="activityFeed__description__image"
          loading="lazy" />`;
  }

  return "";
}

function embed(item) {
  switch (item.type) {
    case "tweet":
      return TweetEmbed({ tweetUrl: item.tweetEmbed.tweetUrl });
    case "youtube":
      return VideoEmbed({
        embedUrl: item.videoEmbed.embedUrl,
        title: item.videoEmbed.title,
        showTitle: false,
      });
    case "youtube-short":
      return VideoEmbed({
        embedUrl: item.videoEmbed.embedUrl,
        title: item.videoEmbed.title,
        showTitle: false,
        isShort: true,
      });
    default:
      return "";
  }
}

function openingTag(item, forceActiveState) {
  let href = false;
  const forceActiveClass = forceActiveState ? " activityFeed__item--forceActive" : "";

  if (item.type === "talk") {
    href = `/talks/${item.slug}/`;
  }

  if (item.type === "post") {
    href = `/blog/${item.slug}/`;
  }

  if (item.link) {
    href = item.link;
  }

  if (href) {
    return `<a href="${href}" class="activityFeed__item activityFeed__link${forceActiveClass}">`;
  }

  return `<div class="activityFeed__item${forceActiveClass}">`;
}

function closingTag(item) {
  if (item.type === "talk" || item.type === "post" || item.link) {
    return `</a>`;
  }

  return `</div>`;
}

const activityType = {
  award: "Award",
  event: "Event",
  link: "Did a thing",
  podcast: "Podcast",
  post: "Blog post",
  talk: "Published a talk",
  tweet: "Twitter",
  youtube: "YouTube",
  "youtube-short": "YouTube",
};

const ActivityFeedItem = ({ item, forceActiveState = false }) => {
  const heading = item.title || item.name;

  return `
  ${openingTag(item, forceActiveState)}
    <div class="activityFeed__meta">
      <span class="activityFeed__metaDate">
        <span class="activity__metaIcon">${CalendarIcon()}</span>
        <span class="activity__metaText">${DateUtils.formatDateForDisplay(item.date)}</span>
      </span>
      <span class="activityFeed__type activityFeed__type--${item.type}">${
    activityType[item.type]
  }</span>
    </div>

    <h2 class="activityFeed__title">${heading}</h2>
    ${description(item)}
    ${embed(item)}
    ${item.image ? image(item.image) : ""}
  ${closingTag(item)}`;
};

module.exports = ActivityFeedItem;
