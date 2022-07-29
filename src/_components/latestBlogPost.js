const TopicsButton = require("./topicsButton");
const SeeAllCta = require("./seeAllCta");
const StopwatchIcon = require("../_components/svg/stopwatchIcon");
const CalendarIcon = require("../_components/svg/calendarIcon");
const DateUtils = require("../../lib/dateUtils");

var md = require("markdown-it")({
  html: true,
});

function LatestBlogPost({ post }) {
  return /*html*/ `
    <article class="homeCard">
      <a href="/blog/${post.slug}/" class="homeCard__linkForTitle" id="post-${post.sys.id}">
        <h3 class="homeCard__title">${post.title}</h3>
      </a>

      <p class="postCard__meta">
        <span class="postCard__metaIcon">${CalendarIcon()}</span>
        <span class="postCard__metaText">${DateUtils.formatDateForDisplay(post.date)}</span>
        <span class="postCard__metaIcon">${StopwatchIcon()}</span>
        <span class="postCard__metaText">${post.readingTime} min read</span>
      </p>

      <div class="homeCard__excerpt">
        ${md.render(post.excerpt)}
      </div>

      <div class="homeCard__ctaRow">
        ${TopicsButton({
          topics: post.topicsCollection.items,
          url: `/blog/${post.slug}/`,
          ariaDescribedBy: `post-${post.sys.id}`,
        })}
        
        ${SeeAllCta({ things: "blog posts", url: "/blog/" })}
      </div>
    </article>
  `;
}

module.exports = LatestBlogPost;
