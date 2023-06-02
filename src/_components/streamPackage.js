var md = require("markdown-it")({
  html: true,
});

function StreamPackage({ package }) {
  return /* html */ `
  
  <div class="streamPackage">
    <h4 class="streamPackage__title">${package.title}</h4>
    <div class="streamPackage__description">
      ${md.render(package.description)}
    </div>
  </div>`;
}

module.exports = StreamPackage;
