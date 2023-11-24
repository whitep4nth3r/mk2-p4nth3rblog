const PlayIcon = require("./svg/playIcon");

function TwitchInfo() {
  return /* html */ `
  <div data-twitchinfo-wrapper class="twitchInfo">
    <a href="https://twitch.tv/whitep4nth3r" class="twitchInfo__link" data-twitchinfo-link>
      <div class="twitchInfo__deets">
        <span class="twitchInfo__streamTitleContainer">
          <p class="twitchInfo__streamTitle" data-twitchinfo-title>Watch me fix my website LIVE: debug behind the scenes</p>
        </span>
        <p class="twitchInfo__live" data-twitchinfo-live>
          Live now ${PlayIcon()}
        </p>
      </div>
      <img src="/img/stream_thumb_fallback.jpg" alt="" class="twitchInfo__thumbnail" height="1080" width="1920" data-twitchinfo-thumbnail />
      </a>
  </div>
  `;
}

module.exports = TwitchInfo;
