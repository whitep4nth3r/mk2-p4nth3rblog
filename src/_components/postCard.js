const TopicsButton = require("../_components/topicsButton");
const StopwatchIcon = require("../_components/svg/stopwatchIcon");
const CalendarIcon = require("../_components/svg/calendarIcon");
const DateUtils = require("../../lib/dateUtils");

function PostCard({ post, baseSlug, isTalk }) {
  const timeSuffix = isTalk ? "watch time" : "read";
  return /*html*/ `
    <article class="postCard">
        <div class="postCard__imageWrap">
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

        <p class="postCard__meta">
          <span class="postCard__metaIcon">${CalendarIcon()}</span>
          <span class="postCard__metaText">${DateUtils.formatDateForDisplay(post.date)}</span>
          <span class="postCard__metaIcon">${StopwatchIcon()}</span>
          <span class="postCard__metaText">${post.readingTime || post.watchTime} min ${timeSuffix}</span>
        </p>

        <a href="/${baseSlug}/${post.slug}/" class="postCard__titleLink" id="post-${post.sys.id}">
          <h2>
            ${post.title}
          </h2>
        </a>
        <div>
          ${TopicsButton({
            topics: post.topicsCollection.items,
            url: `/${baseSlug}/${post.slug}/`,
            ariaDescribedBy: `post-${post.sys.id}`,
          })}
        </div>
      </article>
  `;
}

module.exports = PostCard;
