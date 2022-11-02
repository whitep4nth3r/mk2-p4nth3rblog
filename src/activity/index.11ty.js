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
  const { postSummaries, talkSummaries, feedEvents } = data;

  const orderByDate = (a, b) => {
    if (a.date < b.date) {
      return 1;
    }

    return -1;
  };

  const activityFeed = [...postSummaries, ...talkSummaries, ...feedEvents].sort(orderByDate);

  return /* html */ `
  
  <section>
    <div>
      ${activityFeed
        .map((item) => {
          switch (item.type) {
            case "event":
              return `<p>${item.name}</p>`;
            case "postSummary":
              return `<p>${item.title}</p>`;
            case "talkSummary":
              return `<p>${item.title}</p>`;
            default:
              return "";
          }
        })
        .join("")}
    </div>
  </section>`;
};
