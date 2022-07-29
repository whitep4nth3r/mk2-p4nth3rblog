const SeeAllCta = require("./seeAllCta");
const DiscordIcon = require("./svg/discordIcon");

function GetInvolvedOpenSource() {
  return /*html*/ `
    <div class="homeCard">
      <h2 class="homeCard__title">Join the community</h2>
      <div class="homeCard__excerpt">
        <p>Join a growing community of developers who are building stuff, learning things, and helping each other grow through the power of open source software.</p>
      </div>
      <div>
      <a href="/discord" rel="nofollow noreferrer" target="_blank" class="homeCard__button">
        <span>${DiscordIcon()}</span>
        <span>Join Discord</span>
        <span role="presentation">→</span>
      </a>
      </div>
    ${SeeAllCta({ things: "open source projects", url: "/projects/" })}
    </div>
  `;
}

module.exports = GetInvolvedOpenSource;
