const OpenGraph = require("../../lib/openGraph");
const pageTitle = "My activity feed";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription: `TO DO`,
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/activity/",
};

exports.render = function (data) {
  const { postSummaries } = data;
  const activityFeed = [...postSummaries];

  return /* html */ `
  
  <section>
    <div>
      ${activityFeed.map((item) => `<div>${item.title}</div>`).join("")}
    </div>
  </section>`;
};
