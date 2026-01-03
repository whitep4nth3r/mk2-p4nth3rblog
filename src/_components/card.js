const DateUtils = require("../../lib/dateUtils.js");

var md = require("markdown-it")({
  html: true,
});

function openingTag({ item, heading }) {
  let href = false;

  if (item.type === "talk") {
    href = `/talks/${item.slug}/`;
  }

  if (item.type === "post") {
    href = `/blog/${item.slug}/`;
  }

  if (item.link && item.type !== "thing") {
    href = item.link;
  }

  if (href) {
    return `<a href="${href}" class="card" aria-label="${heading}">`;
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

function renderImage({ image, lazyLoad }) {
  // empty alt because purely decorative
  // todo — optimize image types here

  const lazy = lazyLoad ? ` loading="lazy"` : "";

  if (image) {
    return `
      <picture>
        <source type="image/avif" srcSet="${image.url}?w=450&fm=avif" />
        <source type="image/webp" srcSet="${image.url}?w=450&fm=webp" />
        <img 
          src="${image.url}?w=450"
          alt=""
          role="presentation"
          height="${image.height}"
          width="${image.width}"
          ${lazy}
          class="card__image" />
      </picture>`;
  }

  return ``;
}

function closingTag(item) {
  if (item.type === "talk" || item.type === "post" || item.link) {
    return `</a>`;
  }

  return `</div>`;
}

function formatCategoryName(name) {
  if (name === "pc components") {
    return "PC Components";
  }

  return name;
}

function renderType(item) {
  if (item.type === "thing") {
    return `<div class="card__meta"><span class="card__metaLabel">${formatCategoryName(item.category)}</span></div>`;
  }

  return `<div class="card__meta"><span class="card__metaLabel">${activityType[item.type]}</span></div>`;
}

function renderDate(item) {
  if (item.type !== "thing") {
    return `<p class="card__date">
    ${DateUtils.formatDateForDisplay(item.date)}
    </p>`;
  }

  return "";
}

const activityType = {
  award: "Award",
  event: "Event",
  link: "Link",
  podcast: "Podcast",
  post: "Article",
  talk: "Talk",
  youtube: "YouTube",
  "youtube-short": "Short",
};

function itemMeta(item) {
  if (item.type === "post") {
    return `
    <div class="card__meta">
      <span class="card__metaLabel">${item.topicsCollection.items[0].name}</span>
      <span class="card__metaRead">${item.readingTime} min</span>
    </div>`;
  }

  if (item.type === "talk") {
    return `
    <div class="card__meta">
      <span class="card__metaLabel">${item.topicsCollection.items[0].name}</span>
      <span class="card__metaRead">${item.watchTime} min</span>
    </div>
    `;
  }
}

const Card = ({ item, showType = true, lazyLoad = false }) => {
  const heading = item.title || item.name;
  const itemImage = findImage(item);

  const modifier = item.type === "thing" ? " card__imageContainer--large" : "";

  return `
  ${openingTag({ item, heading })}
    ${showType === false ? itemMeta(item) : renderType(item)}
    <div class="card__imageContainer${modifier}">
      ${renderImage({ image: itemImage, lazyLoad: lazyLoad })}
    </div>
    <div class="card__inner">
      ${renderDate(item)}
      <h2 class="card__title" style="view-transition-name: heading-${item.sys.id}">${heading}</h2>
      ${description(item)}
      ${
        item.type === "thing" && item.link
          ? `<a href="${item.link}" class="card__linkButton" target="_blank">Buy this thing</a>`
          : ""
      }
    </div>
    ${closingTag(item)}`;
};

module.exports = Card;
