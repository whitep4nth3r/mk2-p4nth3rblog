const ClockIcon = require("./svg/clockIcon");
const CalendarIcon = require("./svg/calendarIcon");
const SeeAllCta = require("./seeAllCta");
const YoutubeIcon = require("../_components/svg/youtubeColor");

function calculateIcon(type) {
  switch (type) {
    case "youtube":
      return YoutubeIcon();
    default:
      return CalendarIcon();
  }
}

function NextNonTwitchEvent({ event }) {
  return /*html*/ `
      <div class="nextTwitchStream">
        <h3 class="nextTwitchStream__title">
          Next event: ${event.name}
        </h3>
              
          <a href="${event.link}" target="_blank" rel="nofollow noreferrer" class="nextTwitchStream__link">
            <p class="nextTwitchStream__meta">
              <span class="nextTwitchStream__metaIcon">${CalendarIcon()}</span>
              <span class="nextTwitchStream__metaInfo">
                <local-time 
                    datetime="${event.date}"
                    weekday="short"
                    month="short"
                    day="numeric"
                    year="numeric"
                    hour="numeric"
                    minute="numeric"
                    time-zone-name="short">
                  ${event.date}
                </local-time>
              </span>
            </p>
            <p class="nextTwitchStream__meta">
              <span class="nextTwitchStream__metaIcon">${ClockIcon()}</span>
              <span class="nextTwitchStream__metaInfo nextTwitchStream__metaInfo--timeUntil">
                <time-until datetime="${event.date}"></time-until>
              </span>
            </p>
          </a>

        <p class="nextTwitchStream__streamInfo">${event.description}</p>

        <div>
          <a href="${event.link}"
          class="nextTwitchStream__cta"
          target="_blank" title="Watch live on Twitch" rel="nofollow noreferrer">
            ${calculateIcon(event.type)} 
            <span>Go to event</span>
          </a>
        </div>

        ${SeeAllCta({ things: "events", url: "/about/#events" })}
      </div>

      <script type="module" src="/js/time_elements.js"></script>
    `;
}

module.exports = NextNonTwitchEvent;
