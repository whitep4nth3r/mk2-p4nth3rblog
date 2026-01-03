const BioImage = require("./bioImage");

var md = require("markdown-it")({
  html: true,
});

function BlogEndAuthor({ author, uUrl }) {
  return /*html*/ `
  <div class="blogEndAuthor">
    <div class="blogEndAuthor__imgContainer">
      ${BioImage({ image: author.imageBio }, true)}
    </div>

    <div class="blogEndAuthor__bio">
      <h3 class="blogEndAuthor__name">Salma Alam-Naylor</h3>
      ${md.render(author.bioPost)}
    </div>
  </div>
  `;
}

module.exports = BlogEndAuthor;
