const DateUtils = require("../../lib/dateUtils");

function NextTwitchStream({ stream, isLive, onVacation }) {
  if (onVacation) {
    return `ON VACATION TO DO`;
  } else {
    return /* html */ `    
    ${isLive ? `<p>LIVE</p>` : ""}
      <div>
        <time dateTime="${DateUtils.formatDateForDateTime(stream.start_time)}">
            ${DateUtils.formatDateForTwitchDisplay(stream.start_time)}
        </time>
        <p>
          ${stream.category.name}
        </p>
        <p>
          ${DateUtils.formatTwitchScheduleTimeSlot(stream.start_time, stream.end_time)}
          <span data-timezone></span>
        </p>
        <h3>
          ${stream.title}
        </h3>

        ${stream.canceled_until ? `<p>Cancelled</p>` : ""}
        
        <a
          href="https://twitch.tv/whitep4nth3r"
          target="_blank"
          title="Watch live on Twitch"
          rel="nofollow noreferrer"
        >watch live</a>
      </div>

    <script>
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      document.querySelector("[data-timezone]").innerText = timezone;
    </script>
  `;
  }
}

module.exports = NextTwitchStream;
