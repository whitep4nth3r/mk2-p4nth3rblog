const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const response = await fetch("https://api.twitter.com/2/users/by?usernames=whitep4nth3r&user.fields=public_metrics", {
    method: "GET",
    headers: {
      "User-Agent": "v2UserLookupJS",
      Authorization: "Bearer " + process.env.TWITTER_BEARER_TOKEN,
    },
  });

  const metrics = await response.json();

  return {
    statusCode: 200,
    headers: {
      "Cache-Control": "public, s-maxage=120, stale-while-revalidate=60",
    },

    body: JSON.stringify({
      followers: metrics.data[0].public_metrics.followers_count,
    }),
  };
};
