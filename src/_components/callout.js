var md = require("markdown-it")({
  html: true,
});

const Callout = ({ title, content }) => {
  return `<div class="post__callout">
  <h3 class="post__callout__title">${title}</h3>
    <div class="post__callout__content">
      ${md.render(content)}
    </div>
  </div>`;
};

module.exports = Callout;
