const OpenGraph = require("../../lib/openGraph");

const pageTitle = "Video......... TO DO";

var md = require("markdown-it")({
  html: true,
});

exports.data = {
  layout: "base.html",
  title: pageTitle,
  activeNav: "video",
  pageType: "video",
  metaDescription: "TO DO",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/video/",
};

exports.render = function (data) {
  return /* html */ `
    <section class="video">
      <div class="video__banner">
        <h1 class="video__headline">
          <img src="/img/this_internet.svg" alt="This internet is ours" />
        </h1>
      </div>
    </section>
  `;
};
