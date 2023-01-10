const ClockIcon = require("./svg/clockIcon");
const TwitchIcon = require("./svg/twitchIcon");
const ResponsiveImage = require("./responsiveImage");

function noStreamIndicator(text) {
  return /*html*/ `<span class="nextTwitchStream__noStream">${text}</span>`;
}

function notLive({ link, image, stream }) {
  return /* html */ `
    ${ResponsiveImage({ image })}
    <h3 class="nextTwitchStream__title">
        Next Twitch stream
      ${stream.canceled_until ? noStreamIndicator("cancelled") : ""}
    </h3>
    <a href="${link}" target="_blank" rel="nofollow noreferrer" class="nextTwitchStream__link">
      <p class="nextTwitchStream__meta">
        <span class="nextTwitchStream__metaIcon">${ClockIcon()}</span>
        <span class="nextTwitchStream__metaInfo" data-time="${stream.start_time}">${stream.start_time}</span>
      </p>
    </a>
    <p class="nextTwitchStream__streamInfo">
        Join the stream whilst I build weird websites, roast your code, and chat about the tech industry.
    </p>
    <div class="homeCard__ctaRow">
      <a href="${link}"
      class="nextTwitchStream__cta"
      target="_blank" title="Watch live on Twitch" rel="nofollow noreferrer">
        <span>
          ${TwitchIcon()}
        </span>
        <span>
          View stream details
        </span>
      </a>
    </div>`;
}

function live() {
  return /* html */ `
    <a href="/about/#events" class="home__itemTitle home__itemTitle--twitch">
    <span class="home__item__onAir">ON AIR</span>
    <span>
      Join <span class="colorHighlight">the stream</span>
    </span>
    </a>
    <div class="nextTwitchStream__player">
      <iframe
        src="https://player.twitch.tv/?channel=whitep4nth3r&parent=${process.env.TWITCH_HOST}"
        height="100%"
        width="100%"
        muted
        autoplay
        allowfullscreen>
      </iframe>
    </div>
    <div class="homeCard__ctaRow">
      <a href="https://twitch.tv/whitep4nth3r"
        class="nextTwitchStream__cta"
        target="_blank" title="Watch live on Twitch" rel="nofollow noreferrer">
        <span>
          ${TwitchIcon()}
        </span>
        <span>
          Watch live
        </span>
      </a>
    </div>
`;
}

function NextTwitchStream({ stream, link, isLive }) {
  const image = {
    title: "twitch_offline_banner",
    description:
      "I'm live on Wednesday and Friday. Salma with two thumbs up against a workstation background with a monitor and lots of tech equipmnent.",
    height: 1080,
    width: 1920,
    contentType: "image/png",
    url: "https://images.ctfassets.net/56dzm01z6lln/6a1A63WJZtkjfrbzgWAYOa/9ee35e6f9ed38eec9512070dc59d6230/twitch_offline_banner_2.png",
  };

  return /*html*/ `
    <div class="nextTwitchStream">
      ${isLive ? live() : notLive({ link, image, stream })}
    </div>
  `;
}

module.exports = NextTwitchStream;
