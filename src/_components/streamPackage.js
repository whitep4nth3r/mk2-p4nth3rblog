var md = require("markdown-it")({
  html: true,
});

function StreamPackage({ package }) {
  return /* html */ `
  
  <div class="streamPackage">
    <p class="streamPackage__title">${package.title}</p>
   
    <p class="streamPackage__description">${md.render(package.description)}</p>
  </div>`;
}

module.exports = StreamPackage;
