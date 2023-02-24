const DateUtils = require("../../lib/dateUtils.js");
const VideoEmbed = require("../_components/videoEmbed");
const TweetEmbed = require("../_components/tweetEmbed");
const CalendarIcon = require("../_components/svg/calendarIcon");

var md = require("markdown-it")({
  html: true,
});

//big to do on image optimisation

function description(item) {
  if (item.description) {
    return `<div class="activityFeed__description">${md.render(item.description)}</div>`;
  }

  if (item.excerpt) {
    const image = item.featuredImage || item.speakerDeckLink.image;
    return `<div class="activityFeed__description activityFeed__description--withImage">
      <div>  
        ${md.render(item.excerpt)}
      </div>
      <img src="${image.url}?w=150" 
          alt="${image.description}"
          height="${image.height}"
          width="${image.width}"
          class="activityFeed__description__image"
          loading="lazy"/>
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
      //TODO — update activity feed content model to include just a link to YT video
      return VideoEmbed({
        embedUrl: item.videoEmbed.embedUrl,
        title: item.videoEmbed.title,
        showTitle: false,
      });
    case "youtube-short":
      //TODO — update activity feed content model to include just a link to YT video
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

function openingTag(item) {
  let href = false;

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
    return `<a href="${href}" class="activityFeed__item">`;
  }

  return `<div class="activityFeed__item">`;
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
};

const ActivityFeedItem = ({ item }) => {
  const heading = item.title || item.name;

  return `
  ${openingTag(item)}
    <p class="activityFeed__date">
      ${DateUtils.formatDateForDisplay(item.date)}
    </p>

    <h2 class="activityFeed__title">${heading}</h2>
    <span class="activityFeed__type activityFeed__type--${item.type}">${
    activityType[item.type]
  }</span>
    ${closingTag(item)}`;
};

module.exports = ActivityFeedItem;

// ${description(item)}
// ${embed(item)}
// ${image(item.image)}
