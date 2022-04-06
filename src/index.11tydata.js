const fetch = require("node-fetch");

function isNotCancelled(segment) {
  return segment.canceled_until === null;
}

module.exports = async function () {
  const twitch = await fetch(`${process.env.DOMAIN}/api/twitch`);
  const twitchData = await twitch.json();

  const nextNotCancelledStream = twitchData.schedule.data.segments.find(isNotCancelled);

  return {
    twitch: {
      nextStream: nextNotCancelledStream,
      isLive: twitchData.isLiveOnTwitch,
      onVacation: twitchData.schedule.data.vacation,
    },
  };
};
