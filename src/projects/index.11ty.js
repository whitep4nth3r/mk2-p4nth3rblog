const OpenGraph = require("../../lib/openGraph");
const pageTitle = "Level up your skills with open source projects";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription: "Get involved with open source projects built live on Twitch with whitep4nth3r",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imageWidth,
  openGraphImageHeight: OpenGraph.imageHeight,
};

exports.render = function (data) {
  return `
    PROJECTS
   `;
};
