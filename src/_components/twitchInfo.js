const PlayIcon = require("./svg/playIcon");
const ResponsiveImage = require("./responsiveImage");

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
          ${ResponsiveImage({
            image: {
              url: `/.netlify/images/?url=${vodData.thumbnail.url}`,
              height: vodData.thumbnail.height,
              width: vodData.thumbnail.width,
              contentType: "image/jpeg",
              description:
                "Stream screenshot. It's auto-generated so I can't give you any details, sorry!",
            },
            classOverride: "twitchInfo__thumbnail",
            loading: "eager",
          })}
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
