const NameLogoLarge = require("./svg/nameLogo-large");
const SocialLinks = require("./socialLinks");

var md = require("markdown-it")({
  html: true,
});

function homeAbout({ bio }) {
  return /* html */ `
  <div class="homeAbout">
    <h1 class="homeAbout__name">
      ${NameLogoLarge()}
    </h1>
    <div class="homeAbout__bio">
      ${md.render(bio)}
    </div>
    <div class="homeAbout__social">
      ${SocialLinks({ uUrl: "https://whitep4nth3r.com/" })}
    </div>
  </div>
  `;
}

module.exports = homeAbout;
