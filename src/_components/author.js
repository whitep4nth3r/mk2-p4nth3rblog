const BioImage = require("./bioImage");
const NameLogoBlog = require("./svg/nameLogo-blog");

function Author({ author, uUrl, hideOnSmallScreens = false }) {
  const hideClass = hideOnSmallScreens ? " author--hideSmall" : "";
  return /*html*/ `
  <div class="author${hideClass}">
    <a href="/about/" class="author__cta" aria-label="About Salma">
      <div class="author__imgContainer">
        ${BioImage({ image: author.imageBio })}
      </div>
      <div class="author__name">
        ${NameLogoBlog()}
      </div>
    </a>
  </div>
  `;
}

module.exports = Author;
