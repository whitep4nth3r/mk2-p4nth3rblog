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
  return `
    <h1>DASHBOARD</h1>
  `;
};
