const fetch = require("node-fetch");

function isNotCancelled(segment) {
  return segment.canceled_until === null;
}

module.exports = async function () {
  const twitch = await fetch(`${process.env.DOMAIN}/api/twitch`);
  const twitchData = await twitch.json();

  const nextNotCancelledStream = twitchData.schedule.data.segments.find(isNotCancelled);
  const buffer = Buffer.from(nextNotCancelledStream.id, "base64");
  const segmentInfo = JSON.parse(buffer);

  return {
    twitch: {
      link: `https://www.twitch.tv/whitep4nth3r/schedule?segmentID=${segmentInfo.segmentID}`,
      stream: nextNotCancelledStream,
      isLive: twitchData.isLiveOnTwitch,
      onVacation: twitchData.schedule.data.vacation,
    },
  };
};
