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
  const { staticDashboard } = data;
  return `
    <h1>DASHBOARD</h1>
    <p>Twitch followers: ${staticDashboard.twitch.followers}</p>
    <p>Twitch views: ${staticDashboard.twitch.views}</p>
    <p>Youtube subs: ${staticDashboard.youtube.subscriberCount}</p>
    <p>Youtube views: ${staticDashboard.youtube.viewCount}</p>
    <p>GitHub followers: ${staticDashboard.github.followers}</p>
    <p>GitHub stars: ${staticDashboard.github.stars}</p>
    <p>Youtube views: ${staticDashboard.youtube.viewCount}</p>
    <p>Twitter followers: ${staticDashboard.twitter.followers}</p>
  `;
};
