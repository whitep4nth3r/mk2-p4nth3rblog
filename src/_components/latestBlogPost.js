const TopicsButton = require("./topicsButton");
const SeeAllCta = require("./seeAllCta");

var md = require("markdown-it")({
  html: true,
});

function LatestBlogPost({ post }) {
  return /*html*/ `
    <article class="homeCard">
      <a href="/blog/${post.slug}/" class="homeCard__linkForTitle" id="post-${post.sys.id}">
        <h3 class="homeCard__title">${post.title}</h3>
      </a>

      <div class="homeCard__excerpt">
        ${md.render(post.excerpt)}
      </div>

      <div class="homeCard__topics">
        ${TopicsButton({
          topics: post.topicsCollection.items,
          url: `/blog/${post.slug}/`,
          ariaDescribedBy: `post-${post.sys.id}`,
        })}
      </div>

      ${SeeAllCta({ things: "blog posts", url: "/blog/" })}
    </article>
  `;
}

module.exports = LatestBlogPost;
