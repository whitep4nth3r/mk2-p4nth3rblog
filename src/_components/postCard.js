const TopicsGroup = require("../_components/topicsGroup");
const StopwatchIcon = require("../_components/svg/stopwatchIcon");
const CalendarIcon = require("../_components/svg/calendarIcon");
const DateUtils = require("../../lib/dateUtils");

function PostCard({ post, baseSlug, isTalk }) {
  const timeSuffix = isTalk ? "watch time" : "read";
  return /*html*/ `
    <a href="${`/${baseSlug}/${post.slug}/`}"
      aria-label="${post.title}"
      id="post-${post.sys.id}"
      class="postCard">
        <div class="postCard__imageWrap">
          ${TopicsGroup({ topics: post.topicsCollection.items })}
          ${
            post.featuredImage
              ? `<img
            class="postCard__image"
            src="${post.featuredImage.url}?w=320"
            alt="${post.featuredImage.description}"
            height="${post.featuredImage.height}"
            width="${post.featuredImage.width}"
            loading="lazy"
          />`
              : ""
          }
        </div>
        <h2 class="postCard__title">
          ${post.title}
        </h2>

        <p class="postCard__meta">
          <span class="postCard__metaIcon">${CalendarIcon()}</span>
          <span class="postCard__metaText">${DateUtils.formatDateForDisplay(post.date)}</span>
          <span class="postCard__metaIcon">${StopwatchIcon()}</span>
          <span class="postCard__metaText">${post.readingTime || post.watchTime} min ${timeSuffix}</span>
        </p>
      </a>
  `;
}

module.exports = PostCard;
