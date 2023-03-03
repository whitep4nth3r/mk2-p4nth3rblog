const DateUtils = require("../../lib/dateUtils.js");
const VideoEmbed = require("../_components/videoEmbed");
const TweetEmbed = require("../_components/tweetEmbed");

var md = require("markdown-it")({
  html: true,
});

//big to do on image optimisation

function description(item) {
  if (item.description) {
    return `<div class="card__description">${md.render(item.description)}</div>`;
  }

  if (item.excerpt) {
    const image = item.featuredImage || item.speakerDeckLink.image;
    return `<div class="card__description card__description--withImage">
      <div>  
        ${md.render(item.excerpt)}
      </div>
      <img src="${image.url}?w=150" 
          alt="${image.description}"
          height="${image.height}"
          width="${image.width}"
          class="card__description__image"
          loading="lazy"/>
    </div> 
    `;
  }

  return "";
}

function image(image) {
  // empty alt because purely decorative
  // todo — optimize image types here
  if (image) {
    return `<div class="card__imageContainer"><img 
          src="${image.url}?w=510" 
          alt="" 
          height="${image.height}"
          width="${image.width}"
          class="card__image"
          loading="lazy" /></div>`;
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
    return `<a href="${href}" class="card">`;
  }

  return `<div class="card">`;
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
  link: "Misc.",
  podcast: "Podcast",
  post: "Blog",
  talk: "Talk",
  youtube: "YouTube",
};

const ActivityFeedItem = ({ item }) => {
  const heading = item.title || item.name;
  const itemImage = item.image || item.featuredImage;

  return `
  ${openingTag(item)}
    ${image(itemImage)}
    <div class="card__inner">
      <p class="card__date">
        ${DateUtils.formatDateForDisplay(item.date)}
      </p>

      <h2 class="card__title">${heading}</h2>
      <span class="card__type card__type--${item.type}">${activityType[item.type]}</span>
  </div>
    ${closingTag(item)}`;
};

module.exports = ActivityFeedItem;

// ${embed(item)}
