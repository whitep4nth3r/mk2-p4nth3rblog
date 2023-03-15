const DateUtils = require("../../lib/dateUtils.js");

var md = require("markdown-it")({
  html: true,
});

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

function findImage(item) {
  switch (item.type) {
    case "post":
      return item.featuredImage;
    case "talk":
      return item.screenshot || item.speakerDeckLink.image;
    default:
      return item.image;
  }
}

function description(item) {
  const content = item.description || item.excerpt;

  if (content) {
    return `<div class="card__description">${md.render(content)}</div>`;
  }

  return "";
}

function renderImage(image) {
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

function itemMeta(item) {
  if (item.type === "post") {
    return `
    <div class="card__meta">
      <span class="card__metaCat">${item.topicsCollection.items[0].name}</span>
      <span class="card__metaRead">${item.readingTime} min read →</span>
    </div>`;
  }

  if (item.type === "talk") {
    return `
    <div class="card__meta">
      <span class="card__metaLabel">${item.topicsCollection.items[0].name}</span>
      <span class="card__metaRead">${item.watchTime} min watch time →</span>
    </div>
    `;
  }
}

const Card = ({ item, showType = true }) => {
  const heading = item.title || item.name;
  const itemImage = findImage(item);

  return `
  ${openingTag(item)}
    ${renderImage(itemImage)}
    <div class="card__inner">
      <p class="card__date">
        ${DateUtils.formatDateForDisplay(item.date)}
      </p>

      <h2 class="card__title">${heading}</h2>
      ${description(item)}
      
      ${
        showType === false
          ? itemMeta(item)
          : `<span class="card__metaLabel">${activityType[item.type]}</span>`
      }
  </div>
    ${closingTag(item)}`;
};

module.exports = Card;

// ${embed(item)}
