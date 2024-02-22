const PlayIcon = require("./svg/playIcon");

function TwitchInfo() {


  return /* html */ `
  <div data-twitch-wrapper class="twitchInfo">
    <a href="https://whitep4nth3r.com" data-twitch-link class="twitchInfo__link">
      <div class="twitchInfo__deets">
        <span class="twitchInfo__streamTitleContainer">
          <p class="twitchInfo__streamTitle" data-twitch-title>Watch me fix my website LIVE: debug behind the scenes</p>
        </span>
        <p class="twitchInfo__live">
          <span data-twitch-subtitle>Last week</span> ${PlayIcon()}
        </p>
      </div>
      <img src="/img/stream_thumb_fallback.jpg" data-twitch-thumbnail alt="" class="twitchInfo__thumbnail" height="1080" width="1920" />
      </a>
  </div>
  `;
}

module.exports = TwitchInfo;
