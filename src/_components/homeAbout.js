const NameLogo = require("./svg/nameLogo");

var md = require("markdown-it")({
  html: true,
});

function homeAbout({ bio }) {
  return /* html */ `
  <div class="homeAbout">
    <h1 class="homeAbout__name">
      ${NameLogo()}
    </h1>
    <div class="homeAbout__bio transition__bio">
      ${md.render(bio)}
    </div>
  </div>
  `;
}

module.exports = homeAbout;
