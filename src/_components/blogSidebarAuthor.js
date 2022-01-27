const ResponsiveImage = require("./responsiveImage");
var md = require("markdown-it")({
  html: true,
});

function BlogSidebarAuthor({ author }) {
  console.log(author);
  return /*html*/ `
  <div class="blogSidebarAuthor">
    <div class="blogSidebarAuthor__imgContainer">
      ${ResponsiveImage({ image: author.image })}
    </div>
    <p class="blogSidebarAuthor__header">by Salma Alam-Naylor</p>
    <div class="blogSidebarAuthor__bio">
      ${md.render(author.bioShort)}
    </div>
  </div>
  `;
}

module.exports = BlogSidebarAuthor;
