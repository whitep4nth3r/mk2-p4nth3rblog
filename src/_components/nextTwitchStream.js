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

function NextTwitchStream({ stream, isLive, onVacation }) {
  const heading = isLive ? "I am live on Twitch right now!" : "Next Twitch stream";

  return /*html*/ `
      <div class="nextTwitchStream">
        <h3 class="nextTwitchStream__title">
          ${heading} 
          ${stream.canceled_until ? noStreamIndicator("cancelled") : ""}
          ${onVacation ? noStreamIndicator("on vacation") : ""}
        </h3>

        ${isLive ? isLiveIndicator() : ""}
        
        <a href="https://www.twitch.tv/whitep4nth3r/schedule" target="_blank" rel="nofollow referrer" class="nextTwitchStream__link">
          <p class="nextTwitchStream__meta">
            <span class="nextTwitchStream__metaIcon">${CalendarIcon()}</span>
            <span class="nextTwitchStream__metaInfo">${DateUtils.formatDateForTwitchDisplay(stream.start_time)}</span>
            
            <p class="nextTwitchStream__meta">
            <span class="nextTwitchStream__metaIcon">${ClockIcon()}</span>
            
            <span class="nextTwitchStream__metaInfo">
            ${DateUtils.formatTwitchScheduleTimeSlot(stream.start_time, stream.end_time)}
            <span data-timezone></span>
            </span>
          </p>
        </a>

        <p class="nextTwitchStream__streamInfo">Join the chat whilst I stream building stuff and learning things every week. Come hang out!</p>

        <div>
          <a href="https://twitch.tv/whitep4nth3r" 
          class="nextTwitchStream__cta"
          target="_blank" title="Watch live on Twitch" rel="nofollow noreferrer">
            <span>
              ${TwitchIcon()}
            </span>
            <span>
              Watch live 
            </span>
            <span role="presentation">→</span>
          </a>
        </div>

         ${SeeAllCta({ things: "events", url: "/about/#events" })}
      </div>

      <script>
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        document.querySelector("[data-timezone]").innerText = timezone;
      </script>
    `;
}

module.exports = NextTwitchStream;
