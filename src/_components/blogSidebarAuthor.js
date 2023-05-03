const BioImage = require("./bioImage");
const SocialLinks = require("./socialLinks");

function BlogSidebarAuthor({ author }) {
  return /*html*/ `
  <div class="blogSidebarAuthor">
    <div class="blogSidebarAuthor__imgContainer">
      ${BioImage({ image: author.imageBio })}
    </div>
    <a href="/about/" class="blogSidebarAuthor__cta">About Salma</a>

    <div class="blogSidebarAuthor_social">
      ${SocialLinks()}
    </div>
  </div>
  `;
}

module.exports = BlogSidebarAuthor;
