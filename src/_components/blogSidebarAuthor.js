const ResponsiveImage = require("./responsiveImage");

function BlogSidebarAuthor({ author }) {
  return /*html*/ `
  <div class="blogSidebarAuthor">
    <div class="blogSidebarAuthor__imgContainer">
      ${ResponsiveImage({ image: author.image })}
    </div>
    <a href="/about/" class="blogSidebarAuthor__cta">by ${
      author.name
    } <span class="colorHighlight" role="presentation">→</span></a>
  </div>
  `;
}

module.exports = BlogSidebarAuthor;
