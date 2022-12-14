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
            <span class="nextTwitchStream__metaInfo" data-time="${event.date}">
              ${event.date}
            </span>
          </p>
        </a>

        <p class="nextTwitchStream__streamInfo">${event.description}</p>

        <div>
          <a href="${event.link}"
          class="nextTwitchStream__cta"
          target="_blank" title="Go to ${event.name}" rel="nofollow noreferrer">
            ${calculateIcon(event.type)} 
            <span>Go to event</span>
          </a>
        </div>
      </div>
    `;
}

module.exports = NextNonTwitchEvent;
