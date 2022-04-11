const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const accessTokenFetchUrl = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials&scope=user_read`;
  const twitchId = "469006291";

  const getAccessToken = async () => {
    try {
      const response = await fetch(accessTokenFetchUrl, {
        method: "POST",
        headers: { accept: "application/vnd.twitchtv.v5+json" },
      });

      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const tokenResponse = await getAccessToken();

  if (tokenResponse.access_token) {
    const fetchOptions = {
      headers: {
        "Client-Id": process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${tokenResponse.access_token}`,
      },
    };

    const userResponse = await fetch(`https://api.twitch.tv/helix/users/follows?to_id=${twitchId}`, fetchOptions);

    const streamsResponse = await fetch(`https://api.twitch.tv/helix/streams?user_id=${twitchId}`, fetchOptions);

    const scheduleResponse = await fetch(
      `https://api.twitch.tv/helix/schedule?broadcaster_id=${twitchId}`,
      fetchOptions,
    );

    const user = await userResponse.json();
    const streams = await streamsResponse.json();
    const schedule = await scheduleResponse.json();

    return {
      statusCode: 200,
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=60",
      },

      body: JSON.stringify({
        followers: user.total,
        isLiveOnTwitch: streams.data.length === 1,
        schedule,
      }),
    };
  }
};
