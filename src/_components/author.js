const BioImage = require("./bioImage");
const SocialLinks = require("./socialLinks");
const NameLogo = require("./svg/nameLogo");

function Author({ author, hideOnSmallScreens = false }) {
  const hideClass = hideOnSmallScreens ? " author--hideSmall" : "";
  return /*html*/ `
  <div class="author${hideClass}">
    <a href="/about/" class="author__cta" aria-label="About Salma">
      <div class="author__imgContainer transition__avatar">
        ${BioImage({ image: author.imageBio })}
      </div>
      <div class="author__name">
        ${NameLogo()}
      </div>
    </a>

    <div class="author_social">
      ${SocialLinks()}
    </div>
  </div>
  `;
}

module.exports = Author;
