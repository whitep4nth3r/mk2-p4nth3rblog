const accessTokenFetchUrl = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials&scope=user_read`;
const twitchId = "469006291";

let tokenInMemory = null;

const TwitchApi = {
  getAccessToken: async function () {
    try {
      const response = await fetch(accessTokenFetchUrl, {
        method: "POST",
        headers: { accept: "application/vnd.twitchtv.v5+json" },
      });
      const token = await response.json();
      tokenInMemory = token;

      return token;
    } catch (error) {
      console.log(error);
    }
  },
  getfetchOptions: function (tokenResponse) {
    return {
      headers: {
        "Client-Id": process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${tokenResponse.access_token}`,
      },
    };
  },
  getSchedule: async function () {
    const tokenResponse = tokenInMemory !== null ? tokenInMemory : await TwitchApi.getAccessToken();

    if (tokenResponse.access_token) {
      const scheduleResponse = await fetch(
        `https://api.twitch.tv/helix/schedule?broadcaster_id=${twitchId}`,
        TwitchApi.getfetchOptions(tokenResponse),
      );

      if (scheduleResponse.status !== 200) {
        return null;
      }

      const schedule = await scheduleResponse.json();
      return schedule;
    }
  },
};

module.exports = TwitchApi;
