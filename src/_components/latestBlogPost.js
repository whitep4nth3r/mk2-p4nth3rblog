const TopicsButton = require("./topicsButton");
const SeeAllCta = require("./seeAllCta");

var md = require("markdown-it")({
  html: true,
});

function LatestBlogPost({ post }) {
  return /*html*/ `
    <article class="homeCard">
      <h3 class="homeCard__title">${post.title}</h3>

      <div class="homeCard__excerpt">
        ${md.render(post.excerpt)}
      </div>

      <div class="homeCard__topics">
        ${TopicsButton({
          topics: post.topicsCollection.items,
          url: `/blog/${post.slug}/`,
          ariaLabel: `Read ${post.title}`,
        })}
      </div>

      ${SeeAllCta({ things: "blog posts", url: "/blog/" })}
    </article>
  `;
}

module.exports = LatestBlogPost;
