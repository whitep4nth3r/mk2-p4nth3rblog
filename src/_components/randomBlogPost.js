const TopicsButton = require("./topicsButton");
const SeeAllCta = require("./seeAllCta");
const StopwatchIcon = require("./svg/stopwatchIcon");
const CalendarIcon = require("./svg/calendarIcon");
const DateUtils = require("../../lib/dateUtils");

var md = require("markdown-it")({
  html: true,
});

function RandomBlogPost({ post }) {
  return /*html*/ `
    <article class="homeCard">
      <a href="/blog/${post.slug}/" class="homeCard__linkForTitle" id="post-${post.sys.id}">
        <h3 class="homeCard__title">${post.title}</h3>
      </a>

      <p class="homeCard__meta">
        <span class="homeCard__metaIcon">${CalendarIcon()}</span>
        <span class="homeCard__metaText">${DateUtils.formatDateForDisplay(post.date)}</span>
        <span class="homeCard__metaIcon">${StopwatchIcon()}</span>
        <span class="homeCard__metaText">${post.readingTime} min read</span>
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
        <a href="/blog/" class="homeCard__seeAllCta">See all blog posts <span class="colorHighlight" aria-hidden="true">→</span></a>
      </div>
    </article>
  `;
}

module.exports = RandomBlogPost;
