const BioImage = require("./bioImage");
const SocialLinks = require("./socialLinks");
const NameLogo = require("./svg/nameLogo");

function BlogSidebarAuthor({ author }) {
  return /*html*/ `
  <div class="blogSidebarAuthor">
    <a href="/about/" class="blogSidebarAuthor__cta" aria-label="About Salma">
      <div class="blogSidebarAuthor__imgContainer">
        ${BioImage({ image: author.imageBio })}
      </div>
      <div class="blogSidebarAuthor__name">
        ${NameLogo()}
      </div>
    </a>

    <div class="blogSidebarAuthor_social">
      ${SocialLinks()}
    </div>
  </div>
  `;
}

module.exports = BlogSidebarAuthor;
