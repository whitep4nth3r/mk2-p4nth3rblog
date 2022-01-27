const PostCard = require("./postCard");

function BlogPostEmbed({ post }) {
  return /* html */ `
  <div>
    ${PostCard({ post, baseSlug: "blog", isTalk: false })}
  </div>`;
}

module.exports = BlogPostEmbed;
