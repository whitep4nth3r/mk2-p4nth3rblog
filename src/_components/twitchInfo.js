const PlayIcon = require("./svg/playIcon");

function TwitchInfo({ isLive, vodData }) {
  return /* html */ `
  ${
    !isLive
      ? /* html */ `<div class="twitchInfo">
        <a href="${vodData.link}" class="twitchInfo__link">
          <div class="twitchInfo__deets">
            <span class="twitchInfo__streamTitleContainer">
              <p class="twitchInfo__streamTitle">
                ${vodData.title}
              </p>
            </span>
            <p class="twitchInfo__live">
              ${vodData.subtitle} ${PlayIcon()}
            </p>
          </div>
          <img
            src="${vodData.thumbnail.url}"
            alt="Stream screenshot. It's auto-generated so I can't give you any details, sorry!"
            class="twitchInfo__thumbnail"
            height="${vodData.thumbnail.height}"
            width="${vodData.thumbnail.width}"
          />
        </a>
      </div>`
      : /* html */ `<div id="twitch-embed" class="twitchInfo__embed"></div>
      <script src="https://embed.twitch.tv/embed/v1.js"></script>
      <script>
        new Twitch.Embed("twitch-embed", {
          width: 854,
          height: 480,
          channel: "whitep4nth3r",
          layout: "video",
          parent: ["whitep4nth3r.com"]
        });
    </script>
      `
  }
  `;
}

module.exports = TwitchInfo;
