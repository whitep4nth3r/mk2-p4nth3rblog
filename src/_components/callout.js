var md = require("markdown-it")({
  html: true,
});

const Callout = ({ title, content }) => {
  return `<div class="post__callout">
  <h3 class="post__calloutTitle">${title}</h3>
    <div class="post__calloutContent">
      ${md.render(content)}
    </div>
  </div>`;
};

module.exports = Callout;
