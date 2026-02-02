const Config = require("../../lib/config.js");
const Card = require("../_components/card");
const Pagination = require("../_components/pagination");
const OpenGraph = require("../../lib/openGraph");

const pageTitle = "Watch talks about web development by Salma Alam-Naylor";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription: `Watch talks about web dev and more from ${Config.meta.jobDescription}.`,
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: "Watch talks about web development" }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/talks/",
  pagination: {
    data: "talkSummaries",
    size: Config.pagination.pageSize,
    addAllPagesToCollections: true,
  },
  includeInSitemap: true,
  sitemapChangeFreq: "monthly",
  sitemapPriority: "0.5",
  permalink: (data) => {
    const trailing = data.pagination.pageNumber === 0 ? `` : `${data.pagination.pageNumber + 1}/`;
    return `talks/${trailing}`;
  },
};

exports.render = function (data) {
  return /* html */ `
  
  <section>
    <h1 class="page__header">${data.talkSummaries.length} recorded talks</h1>

    <ol class="talks__cardGrid">
      ${data.pagination.items
        .map(function (item) {
          return `
            <li>
            ${Card({ item, showType: false })}
            </li>`;
        })
        .join("")}
    </ol>
     ${
       data.pagination.pages.length > 1
         ? Pagination({
             previous: data.pagination.href.previous,
             next: data.pagination.href.next,
             currentPage: data.pagination.pageNumber,
             totalPages: data.pagination.pages.length,
           })
         : ""
     }
  </section>`;
};
