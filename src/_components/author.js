const BioImage = require("./bioImage");
const NameLogoBlog = require("./svg/nameLogo-blog");

var md = require("markdown-it")({
  html: true,
});

function Author({ author, uUrl }) {
  return /*html*/ `
  <div class="author">
    <a href="/about/" class="author__cta" aria-label="About Salma">
      <div class="author__imgContainer">
        ${BioImage({ image: author.imageBio })}
      </div>
      <div class="author__name">
        <span class="nameLogo">
          <span class="nameLogo__top">Salma</span>
          <span class="nameLogo__bottom">Alam-Naylor</span>
        </span>
      </div>
    </a>

    <div class="author__info">
      ${md.render(author.bioPost)}
    </div>
  </div>
  `;
}

module.exports = Author;
