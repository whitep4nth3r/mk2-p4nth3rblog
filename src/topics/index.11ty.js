const Config = require("../../lib/config");
const Topics = require("../_components/topics");
const OpenGraph = require("../../lib/openGraph");

const pageTitle = "Explore posts about web development and more from whitep4nth3r";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription: `Learn about web development, accessibility, Jamstack, JavaScript, and more from ${Config.meta.jobDescription}.`,
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/topics/",
};

exports.render = function (data) {
  const { topics } = data;
  return /*html*/ `
    <section class="page__index">
      <div class="page__header">
        <h1 class="page__headerTitle">explore posts by <span class="colorHighlight">topic</span></h1>
      </div>
      <div class="page__intro">
        <h2 class="page__introTitle">Blog posts and tutorials</h2>
        <p class="page__introText">I write and live stream about front end development. Read tutorials and quick tips on HTML, CSS, JavaScript and Jamstack. Click on the categories to filter posts by topic.</p>
      </div>
      ${Topics({ topics, showLinkToBlog: true })}
    </section>
   `;
};
