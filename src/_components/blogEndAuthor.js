const BioImage = require("./bioImage");
const SocialLinks = require("./socialLinks");

var md = require("markdown-it")({
  html: true,
});

function BlogEndAuthor({ author }) {
  return /*html*/ `
  <div class="blogEndAuthor">
    <div class="blogEndAuthor__imgContainer">
      ${BioImage({ image: author.imageBio })}
    </div>

    <div class="blogEndAuthor__bio">
      <h3 class="blogEndAuthor__name">Salma Alam-Naylor</h3>
      ${md.render(author.bioPost)}
    </div>

    <div class="blogEndAuthor_social">
      ${SocialLinks()}
    </div>
  </div>
  `;
}

module.exports = BlogEndAuthor;
