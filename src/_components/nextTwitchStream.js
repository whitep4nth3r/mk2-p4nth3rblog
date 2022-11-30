const ClockIcon = require("./svg/clockIcon");
const CalendarIcon = require("./svg/calendarIcon");
const TwitchIcon = require("./svg/twitchIcon");
const ResponsiveImage = require("./responsiveImage");

function noStreamIndicator(text) {
  return /*html*/ `<span class="nextTwitchStream__noStream">${text}</span>`;
}

function NextTwitchStream({ stream, link, isLive }) {
  const heading = isLive ? "I'm live on Twitch right now" : `Next Twitch stream`;
  const buttonText = isLive ? "Watch live" : "View stream details";
  const buttonLink = isLive ? "https://twitch.tv/whitep4nth3r" : link;

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
        ${!isLive ? ResponsiveImage({ image }) : ""}
        <h3 class="nextTwitchStream__title">
          ${heading}
          ${stream.canceled_until ? noStreamIndicator("cancelled") : ""}
        </h3>

        ${
          isLive
            ? `<div class="nextTwitchStream__player">
                <iframe
                  src="https://player.twitch.tv/?channel=whitep4nth3r&parent=${process.env.TWITCH_HOST}"
                  height="100%"
                  width="100%"
                  muted
                  autoplay
                  allowfullscreen>
                </iframe>
              </div>`
            : ""
        }
              
      ${
        !isLive
          ? `
          <a href="${buttonLink}" target="_blank" rel="nofollow noreferrer" class="nextTwitchStream__link">
            <p class="nextTwitchStream__meta">
              <span class="nextTwitchStream__metaIcon">${CalendarIcon()}</span>
              <span class="nextTwitchStream__metaInfo">
                <local-time 
                    datetime="${stream.start_time}"
                    weekday="short"
                    month="short"
                    day="numeric"
                    year="numeric"
                    hour="numeric"
                    minute="numeric"
                    time-zone-name="short">
                  ${stream.start_time}
                </local-time>
              </span>
            </p>
            <p class="nextTwitchStream__meta">
              <span class="nextTwitchStream__metaIcon">${ClockIcon()}</span>
              <span class="nextTwitchStream__metaInfo nextTwitchStream__metaInfo--timeUntil">
                <time-until datetime="${stream.start_time}"></time-until>
              </span>
            </p>
          </a>`
          : ""
      }

        ${
          !isLive
            ? `<p class="nextTwitchStream__streamInfo">
              Join the stream whilst I build weird websites, roast your code, and chat about the tech industry.
            </p>`
            : ""
        }

        <div class="homeCard__ctaRow">
          <a href="${buttonLink}"
          class="nextTwitchStream__cta"
          target="_blank" title="Watch live on Twitch" rel="nofollow noreferrer">
            <span>
              ${TwitchIcon()}
            </span>
            <span>
              ${buttonText}
            </span>
          </a>
        </div>
      </div>

      <script type="module" src="/js/time_elements.js"></script>
    `;
}

module.exports = NextTwitchStream;
