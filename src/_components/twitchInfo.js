const PlayIcon = require("./svg/playIcon");

function TwitchInfo() {
  return /* html */ `
  <div data-twitch-wrapper class="twitchInfo">
    <a href="https://whitep4nth3r.com" data-twitch-link class="twitchInfo__link">
    <img src="/img/test-crt.png" class="twitchInfo__crt" alt="Old school CRT screen" />


      <!-- <div class="twitchInfo__deets">
        <span class="twitchInfo__streamTitleContainer">
          <p class="twitchInfo__streamTitle" data-twitch-title>Watch me fix my website LIVE: debug behind the scenes</p>
        </span>
        <p class="twitchInfo__live">
          <span data-twitch-subtitle>Last week</span> ${PlayIcon()}
        </p>
        </div> -->
        <div class="twitchInfo__thumbContainer" data-thumb-container>

        </div>
      </a>
  </div>
  `;
}

module.exports = TwitchInfo;
