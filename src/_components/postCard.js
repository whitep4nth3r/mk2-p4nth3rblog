const TopicsButton = require("../_components/topicsButton");
const LightningIcon = require("../_components/svg/lightningIcon");
const DateUtils = require("../../lib/dateUtils");

function PostCard({ post, baseSlug, isTalk }) {
  const timeSuffix = isTalk ? "watch time" : "read";
  return /*html*/ `
    <article class="postCard">
        <p class="postCard__meta">
          <span class="postCard__metaIcon">${LightningIcon()}</span>
          <time dateTime="${DateUtils.formatDateForDateTime(post.date)}">
            ${DateUtils.formatDateForDisplay(post.date)}
          </time>
          <span class="postCard__metaIcon">•</span>
          <span>${post.readingTime || post.watchTime} min ${timeSuffix}</span>
        </p>
        <a href="/${baseSlug}/${post.slug}" class="postCard__titleLink">
          ${post.title}
        </a>
        <div class="postCard__topics">
          ${TopicsButton({
            topics: post.topicsCollection.items,
            url: `/${baseSlug}/${post.slug}/`,
            ariaLabel: `Read ${post.title}`,
          })}
        </div>
      </article>
  `;
}

module.exports = PostCard;
