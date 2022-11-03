const OpenGraph = require("../../lib/openGraph");
const pageTitle = "My activity feed";
const ActivityFeedItem = require("../_components/activityFeedItem");
const Pagination = require("../_components/pagination");

exports.data = {
  layout: "base.html",
  pageType: "activityFeed",
  title: pageTitle,
  metaDescription: `TO DO`,
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/activity/",
  pagination: {
    data: "activityFeed",
    size: 10,
    addAllPagesToCollections: true,
  },
  permalink: (data) => {
    const trailing = data.pagination.pageNumber === 0 ? `` : `${data.pagination.pageNumber + 1}/`;
    return `activity/${trailing}`;
  },
};

exports.render = function (data) {
  // const orderByDate = (a, b) => {
  //   if (a.date < b.date) {
  //     return 1;
  //   }

  //   return -1;
  // };

  return /* html */ `
  <section class="activityFeed">
    <h1 class="activityFeed__header">Activity feed</h1>
    ${data.pagination.items.map((item) => ActivityFeedItem({ item })).join("")}

    ${Pagination({
      previous: data.pagination.href.previous,
      next: data.pagination.href.next,
      currentPage: data.pagination.pageNumber,
      totalPages: data.pagination.pages.length,
    })}
  </section>`;
};
