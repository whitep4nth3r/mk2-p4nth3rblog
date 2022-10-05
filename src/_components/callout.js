var md = require("markdown-it")({
  html: true,
});

const Callout = ({ title, content, emoji = "💡" }) => {
  return `<div class="post__callout">
  <h3 class="post__calloutTitle">${emoji} ${title}</h3>
    <div class="post__calloutContent">
      ${md.render(content)}
    </div>
  </div>`;
};

module.exports = Callout;
