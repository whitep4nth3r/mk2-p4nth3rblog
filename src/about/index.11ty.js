const RichText = require("../_components/richText");
const ResponsiveImage = require("../_components/responsiveImage");
const OpenGraph = require("../../lib/openGraph");
const pageTitle = "About whitep4nth3r — biographies, links and more.";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription:
    "whitep4nth3r helps developers build stuff, learn things and love what they do. She currently works at Netlify, streams live coding on Twitch, and loves helping people get into tech.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imageWidth,
  openGraphImageHeight: OpenGraph.imageHeight,
};

exports.render = function (data) {
  const { person } = data;
  return /* html */ `
    <h1>${person.name}</h1>
    ${ResponsiveImage({ image: person.image })}
    ${RichText(person.bioLong, { renderRssFriendlyImg: false, absoluteUrls: false, renderHeadingLinks: false })}
    <p>Twitter: @${person.twitterUsername}</p>
    <p>Twitch: @${person.twitchUsername}</p>
    <p>Github: @${person.gitHubUsername}</p>
  `;
};
