require("dotenv").config();
const TwitchApi = require("../../lib/twitchApi");

const ContentfulEvents = require("../../lib/contentfulEvents.js");
const DateUtils = require("../../lib/dateUtils");

function removeTwitchStreamsWhenOnVacation(events, startTime, endTime) {
  return events.filter((ev) => ev.date < startTime || ev.date > endTime);
}

module.exports = async function () {
  const futureEvents = await ContentfulEvents.getAll({ future: true });

  const dbEvents = futureEvents.map((ev) => {
    return {
      ...ev,
      type: ev.link?.includes("youtube") ? "youtube" : "db",
      canceled_until: null,
    };
  });

  let filteredTwitchEvents = [];
  let sortedEvents = [];

  const twitchSchedule = await TwitchApi.getSchedule();

  if (twitchSchedule !== null) {
    const twitchStreams = twitchSchedule.data.segments;
    const twitchVacation = twitchSchedule.data.vacation;

    const twitchEvents = twitchStreams.map((ev) => {
      const buffer = Buffer.from(ev.id, "base64");
      const segmentInfo = JSON.parse(buffer);

      return {
        ...ev,
        date: ev.start_time,
        name: `Live on Twitch: ${ev.title}`,
        link: `https://www.twitch.tv/whitep4nth3r/schedule?segmentID=${segmentInfo.segmentID}`,
        type: "twitch",
      };
    });

    filteredTwitchEvents =
      twitchVacation !== null
        ? removeTwitchStreamsWhenOnVacation(twitchEvents, twitchVacation.start_time, twitchVacation.end_time)
        : twitchEvents;
  }

  // join just next 4 streams with all db events
  const allEvents =
    filteredTwitchEvents.length > 0
      ? dbEvents.concat(
          filteredTwitchEvents[0],
          // filteredTwitchEvents[1]
          // filteredTwitchEvents[2],
          // filteredTwitchEvents[3],
        )
      : dbEvents;

  sortedEvents = allEvents.sort(DateUtils.sortItemsByDateAsc);

  return {
    list: sortedEvents,
  };
};
