require("dotenv").config();
const fetch = require("node-fetch");

const ContentfulEvents = require("../../lib/contentfulEvents.js");
const DateUtils = require("../../lib/dateUtils");

function removeTwitchStreamsWhenOnVacation(events, startTime, endTime) {
  return events.filter((ev) => ev.date < startTime || ev.date > endTime);
}

module.exports = async function () {
  const futureEvents = await ContentfulEvents.getAll({ future: true });

  const dbEvents = futureEvents.map((ev) => {
    return { ...ev, type: ev.link?.includes("youtube") ? "youtube" : "db", canceled_until: null };
  });

  const twitch = await fetch(`${process.env.DOMAIN}/api/twitch`);
  const twitchData = await twitch.json();
  const twitchStreams = twitchData.schedule.data.segments;
  const twitchVacation = twitchData.schedule.data.vacation;

  const twitchEvents = twitchStreams.map((ev) => {
    const buffer = Buffer.from(ev.id, "base64");
    const segmentInfo = JSON.parse(buffer);

    return {
      ...ev,
      date: ev.start_time,
      name: ev.title,
      link: `https://www.twitch.tv/whitep4nth3r/schedule?segmentID=${segmentInfo.segmentID}`,
      type: "twitch",
    };
  });

  const filteredTwitchEvents =
    twitchVacation !== null
      ? removeTwitchStreamsWhenOnVacation(twitchEvents, twitchVacation.start_time, twitchVacation.end_time)
      : twitchEvents;

  const allEvents = dbEvents.concat(filteredTwitchEvents);
  const sortedEvents = allEvents.sort(DateUtils.sortItemsByDateAsc);

  return {
    list: sortedEvents,
    next: sortedEvents[0],
    isLive: twitchData.isLiveOnTwitch,
  };
};
