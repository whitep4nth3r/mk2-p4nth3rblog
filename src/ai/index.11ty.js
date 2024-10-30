const OpenGraph = require("../../lib/openGraph");

const pageTitle = "How I use AI";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription: "Salma doesn't use AI on her website or to generate content verbatim. But it does have its uses.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/ai/",
  includeInSitemap: true,
};

exports.render = function (data) {
  return /* html */ `
    <section class="ai">
      <h1 class="page__headerTitle">AI usage and thoughts</h1>
    
    </section>
  `;
};
