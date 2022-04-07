const DateUtils = require("../../lib/dateUtils");
const ClockIcon = require("./svg/clockIcon");
const CalendarIcon = require("./svg/calendarIcon");
const TwitchIcon = require("./svg/twitchIcon");
const SeeAllCta = require("./seeAllCta");

function isLiveIndicator() {
  return /*html*/ `
    <p class="nextTwitchStream__liveNow">
      <span class="nextTwitchStream__liveNowText">
        Live
      </span>
    </p>
  `;
}

function noStreamIndicator(text) {
  return /*html*/ `<span class="nextTwitchStream__noStream">${text}</span>`;
}

function NextTwitchStream({ stream, link, isLive, onVacation }) {
  const heading = isLive ? "I am live on Twitch right now!" : `Next Twitch stream: ${stream.title}`;
  const buttonText = isLive ? "Watch live" : "View stream details";
  const buttonLink = isLive ? "https://twitch.tv/whitep4nth3r" : link;

  return /*html*/ `
      <div class="nextTwitchStream">
        <h3 class="nextTwitchStream__title">
          ${heading}
          ${stream.canceled_until ? noStreamIndicator("cancelled") : ""}
          ${onVacation ? noStreamIndicator("on vacation") : ""}
        </h3>

        ${
          !onVacation
            ? /*html*/ `
              ${isLive ? isLiveIndicator() : ""}
              
              <a href="https://www.twitch.tv/whitep4nth3r/schedule" target="_blank" rel="nofollow noreferrer" class="nextTwitchStream__link">
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
                </p>
              </a>
              `
            : ""
        }

        <p class="nextTwitchStream__streamInfo">Join the chat whilst I stream building stuff and learning things every week. Come hang out!</p>

        <div>
          <a href="${buttonLink}"
          class="nextTwitchStream__cta"
          target="_blank" title="Watch live on Twitch" rel="nofollow noreferrer">
            <span>
              ${TwitchIcon()}
            </span>
            <span>
              ${buttonText}
            </span>
            <span role="presentation">→</span>
          </a>
        </div>

        ${SeeAllCta({ things: "events", url: "/about/#events" })}
      </div>

      <script type="module" src="/js/time_elements.js"></script>
    `;
}

module.exports = NextTwitchStream;
