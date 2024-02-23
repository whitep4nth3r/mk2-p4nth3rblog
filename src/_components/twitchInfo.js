const PlayIcon = require("./svg/playIcon");

function TwitchInfo() {
  return /* html */ `
  <div data-twitch-wrapper class="twitchInfo">
    <a href="https://whitep4nth3r.com" data-twitch-link class="twitchInfo__link">
      <img src="/img/test-crt.png" class="twitchInfo__crt" alt="Old school CRT screen" />

      <div class="twitchInfo__thumbContainer" data-thumb-container>
        <div class="twitchInfo__deetsContainer">
          <div class="twitchInfo__deets">
            <span class="twitchInfo__streamTitleContainer">
              <p class="twitchInfo__streamTitle" data-twitch-title></p>
            </span>
            <p class="twitchInfo__live">
              <span data-twitch-subtitle></span> ${PlayIcon()}
            </p>
          </div>
        </div>
      </div>
    </a>
  </div>
  `;
}

module.exports = TwitchInfo;
