const OpenGraph = require("../../lib/openGraph");
const pageTitle = "My activity feed — videos, blogs, events, podcasts and more";
const ActivityFeedItem = require("../_components/activityFeedItem");
const Pagination = require("../_components/pagination");

function calculatePageUrl(data) {
  const suffix = data.pagination.pageNumber === 0 ? `` : `${data.pagination.pageNumber + 1}/`;
  return `https://whitep4nth3r.com/activity/${suffix}`;
}

exports.data = {
  layout: "base.html",
  pageType: "activityFeed",
  title: pageTitle,
  metaDescription: `Catch up with what I've been doing on the internet and in real life. Video releases, blog posts, talks events, and more.`,
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  pagination: {
    data: "activityFeed",
    size: 10,
    addAllPagesToCollections: true,
  },
  permalink: (data) => {
    const trailing = data.pagination.pageNumber === 0 ? `` : `${data.pagination.pageNumber + 1}/`;
    return `activity/${trailing}`;
  },
  eleventyComputed: {
    canonical: (data) => calculatePageUrl(data),
    openGraphUrl: (data) => calculatePageUrl(data),
  },
};

exports.render = function (data) {
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
