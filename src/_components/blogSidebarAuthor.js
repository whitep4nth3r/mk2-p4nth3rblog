const BioImage = require("../_components/bioImage");

function BlogSidebarAuthor({ author }) {
  return /*html*/ `
  <div class="blogSidebarAuthor">
    <div class="blogSidebarAuthor__imgContainer">
      ${BioImage({ image: author.imageBio })}
    </div>
    <a href="/about/" class="blogSidebarAuthor__cta">About Salma →</a>
  </div>
  `;
}

module.exports = BlogSidebarAuthor;
