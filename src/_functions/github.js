const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const fetchOptions = {
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: "bearer " + process.env.GITHUB_ACCESS_TOKEN,
      "Content-Type": "application/json",
    },
  };

  const userResponse = await fetch("https://api.github.com/users/whitep4nth3r", fetchOptions);

  const userReposResponse = await fetch("https://api.github.com/users/whitep4nth3r/repos?per_page=100", fetchOptions);

  const user = await userResponse.json();
  const repositories = await userReposResponse.json();
  const mine = repositories.filter((repo) => !repo.fork);
  const stars = mine.reduce((accumulator, repository) => {
    return accumulator + repository["stargazers_count"];
  }, 0);

  return {
    statusCode: 200,
    headers: {
      "Cache-Control": "public, s-maxage=120, stale-while-revalidate=60",
    },

    body: JSON.stringify({
      followers: user.followers,
      stars,
      type: "github",
    }),
  };
};
