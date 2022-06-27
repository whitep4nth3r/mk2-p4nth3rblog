require("dotenv").config();
const fetch = require("node-fetch");

module.exports = async function () {
  const twitch = await fetch(`${process.env.DOMAIN}/api/twitch`);
  const twitchData = await twitch.json();
  const twitchClips = twitchData.clips;

  return { clips: twitchClips.data };
};
