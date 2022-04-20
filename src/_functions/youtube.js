const { google } = require("googleapis");

let googleAuth;

exports.handler = async function (event, context) {
  googleAuth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },

    scopes: ["https://www.googleapis.com/auth/youtube.readonly"],
  });

  const youtube = google.youtube({
    auth: googleAuth,
    version: "v3",
  });

  const response = await youtube.channels.list({
    id: "UCiGFO97qgxZEbbg43mZSeyg",
    part: "statistics",
  });

  const channel = response.data.items[0];
  const { subscriberCount, viewCount } = channel.statistics;

  return {
    statusCode: 200,
    headers: {
      "Cache-Control": "public, s-maxage=120, stale-while-revalidate=60",
    },

    body: JSON.stringify({
      subscriberCount,
      viewCount,
      type: "youtube",
    }),
  };
};
