const NameSvg = require("../_components/svg/name");

var md = require("markdown-it")({
  html: true,
});

function Author({ author }) {
  return /*html*/ `
  <div class="author">
    <div class="author__underlay"></div>
    <a href="/about/" class="author__cta" aria-label="About Salma">
      <div class="author__imgContainer">
        <img src="${author.imageBio.url + `?fm=webp&w=500`}" alt="${author.imageBio.description}" height="${
    author.imageBio.height
  }" width="${author.imageBio.width}" />
      </div>
      <div class="author__name">
          <div class="author__underlay"></div>
          ${NameSvg()}
      </div>
    </a>

    <div class="author__info">
      ${md.render(author.bioPost)}
    </div>
  </div>
  `;
}

module.exports = Author;
