const OpenGraph = require("../../lib/openGraph");
const pageTitle = "whitep4nth3r's serverless stats dashboard";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription: "Track whitep4nth3r's stats in real-time on the Jamstack via serverless functions and magic.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imageWidth,
  openGraphImageHeight: OpenGraph.imageHeight,
};

exports.render = function (data) {
  return /* html */ `
    <h1>DASHBOARD</h1>
    <p>Twitch followers:</p>
    <span data-twitchFollowers>-</span>
    <p>Twitch views:</p>
    <span data-twitchViews>-</span>
    <p>Youtube subs:</p>
    <span data-youtubeSubs>-</span>
    <p>Youtube views:</p>
    <span data-youtubeViews>-</span>
    <p>GitHub followers:</p>
    <span data-githubFollowers>-</span>
    <p>GitHub stars:</p>
    <span data-githubStars>-</span>
    <p>Twitter followers:</p>
    <span data-twitterFollowers>-</span>

    <script type="module">
      async function getDashboard() {
        const youtube = await fetch("/api/youtube");
        const youtubeData = await youtube.json();

        const twitch = await fetch("/api/twitch");
        const twitchData = await twitch.json();

        const github = await fetch("/api/github");
        const githubData = await github.json();

        const twitter = await fetch("/api/twitter");
        const twitterData = await twitter.json();

        return {
          twitchFollowers: twitchData.followers,
          twitchViews: twitchData.views,
          youtubeSubs: youtubeData.subscriberCount,
          youtubeViews: youtubeData.viewCount,
          githubFollowers: githubData.followers,
          githubStars: githubData.stars,
          twitterFollowers: twitterData.followers,
        };
      }

      const dashboard = await getDashboard();

      Object.entries(dashboard).forEach(([key, value]) => {
        document.querySelector("[data-" + key + "]").innerText = value;
      });
    </script>
  `;
};
