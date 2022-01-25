const Topics = require("../_components/topics");
const OpenGraph = require("../../lib/openGraph");

const pageTitle = "Explore posts about web development and more from whitep4nth3r";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription:
    "Explore content about web development, accessibility, Jamstack, JavaScript, and more from whitep4nth3r.",
  openGraphImageUrl: OpenGraph.generateImageUrl(pageTitle),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imageWidth,
  openGraphImageHeight: OpenGraph.imageHeight,
};

exports.render = function (data) {
  const { topics } = data;
  return `${Topics({ topics })}
   `;
};
