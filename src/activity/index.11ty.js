const OpenGraph = require("../../lib/openGraph");
const pageTitle = "My activity feed";
const ActivityFeedItem = require("../_components/activityFeedItem");

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
  const { postSummaries, talkSummaries, activityFeedItems } = data;

  const orderByDate = (a, b) => {
    if (a.date < b.date) {
      return 1;
    }

    return -1;
  };

  const activityFeed = [...postSummaries, ...talkSummaries, ...activityFeedItems].sort(orderByDate);

  return /* html */ `
  
  <section class="activityFeed">
      <h1 class="activityFeed__header">Activity feed</h1>
      ${activityFeed.map((item) => ActivityFeedItem({ item })).join("")}
  </section>`;
};
