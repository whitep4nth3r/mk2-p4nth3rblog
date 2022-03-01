const fetch = require("node-fetch");

module.exports = async function () {
  const twitch = await fetch(`${process.env.DOMAIN}/api/twitch`);
  const twitchData = await twitch.json();

  return {
    twitch: {
      nextStream: twitchData.schedule.data.segments[0],
      isLive: twitchData.isLiveOnTwitch,
      onVacation: twitchData.schedule.data.vacation,
    },
  };
};
