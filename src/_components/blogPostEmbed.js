const Card = require("./card");

function BlogPostEmbed({ post }) {
  return /* html */ `
  <div>
    ${Card({ item: post, showType: false })}
  </div>`;
}

module.exports = BlogPostEmbed;
