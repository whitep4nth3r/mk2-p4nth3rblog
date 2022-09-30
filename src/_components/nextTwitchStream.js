const ClockIcon = require("./svg/clockIcon");
const CalendarIcon = require("./svg/calendarIcon");
const TwitchIcon = require("./svg/twitchIcon");

function noStreamIndicator(text) {
  return /*html*/ `<span class="nextTwitchStream__noStream">${text}</span>`;
}

function NextTwitchStream({ stream, link, isLive }) {
  const heading = isLive ? "I'm currently writing code for your entertainment!" : `Next Twitch stream: ${stream.title}`;
  const buttonText = isLive ? "Watch live" : "View stream details";
  const buttonLink = isLive ? "https://twitch.tv/whitep4nth3r" : link;

  return /*html*/ `
      <div class="nextTwitchStream">
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
              Join the chat whilst I stream building stuff and learning things every week. Come hang out!
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

          <a href="/about/#events" class="homeCard__seeAllCta">See all events <span class="colorHighlight" aria-hidden="true">→</span></a>
        </div>
      </div>

      <script type="module" src="/js/time_elements.js"></script>
    `;
}

module.exports = NextTwitchStream;
