const Topics = require("../_components/topics");
const OpenGraph = require("../../lib/openGraph");

const pageTitle = "Explore posts about web development and more from whitep4nth3r";

exports.data = {
  layout: "base.njk",
  title: pageTitle,
  metaDescription:
    "Explore content about web development, accessibility, Jamstack, JavaScript, and more from whitep4nth3r.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imageWidth,
  openGraphImageHeight: OpenGraph.imageHeight,
  openGraphUrl: "https://whitep4nth3r.com/topics/",
};

exports.render = function (data) {
  const { topics } = data;
  return /*html*/ `<section>
      <div class="topics__header">
        <h1 class="topics__headerTitle">explore posts by <span class="colorHighlight">topic</span></h1>
      </div>
      ${Topics({ topics, showLinkToBlog: true })}
    </section>
   `;
};
