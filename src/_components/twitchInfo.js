const PlayIcon = require("./svg/playIcon");

function TwitchInfo() {
  return /* html */ `
  <div class="twitchInfo">
    <a href="https://twitch.tv/whitep4nth3r" class="twitchInfo__link" data-twitchinfo-link>
      <div class="twitchInfo__deets">
        <span class="twitchInfo__streamTitleContainer">
          <p class="twitchInfo__streamTitle" data-twitchinfo-title></p>
        </span>
        <p class="twitchInfo__live" data-twitchinfo-live>
          Live now ${PlayIcon()}
        </p>
      </div>
      <!-- todo - placeholder image -->
      <img src="" alt="" class="twitchInfo__thumbnail" height="1080" width="1920" data-twitchinfo-thumbnail />
      </a>
  </div>
  `;
}

module.exports = TwitchInfo;
