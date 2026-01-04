const Config = require("../../lib/config.js");
const Card = require("../_components/card");
const Pagination = require("../_components/pagination");
const OpenGraph = require("../../lib/openGraph");

const pageTitle = "Articles";

function calculatePageUrl(data) {
  const suffix = data.pagination.pageNumber === 0 ? `` : `${data.pagination.pageNumber + 1}/`;
  return `https://whitep4nth3r.com/blog/${suffix}`;
}

exports.data = {
  layout: "base.html",
  pageType: "post",
  activeNav: "blog",
  metaDescription: `Salma Alam-Naylor writes about technology the web. Read tutorials and quick tips on HTML, CSS, JavaScript and web dev.`,
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  pagination: {
    data: "postSummaries",
    size: Config.pagination.pageSize,
    addAllPagesToCollections: true,
  },
  permalink: (data) => {
    const trailing = data.pagination.pageNumber === 0 ? `` : `${data.pagination.pageNumber + 1}/`;
    return `blog/${trailing}`;
  },
  includeInSitemap: true,
  eleventyComputed: {
    title: (data) => `${pageTitle} — Page ${data.pagination.pageNumber + 1}`,
    canonical: (data) => calculatePageUrl(data),
    openGraphUrl: (data) => calculatePageUrl(data),
  },
};

exports.render = function (data) {
  return /* html */ `

  <h1 class="page__headerTitle">${data.count} articles</h1>
  <div class="blog">
    <section class="blog__cards">
        <ol class="blog__cardsGrid">
        ${data.pagination.items
          .map(function (item, index) {
            const lazy = index > 5 ? true : false;
            return `
            <li>
              ${Card({ item, showType: false, lazyLoad: lazy })}
            </li>`;
          })
          .join("")}
        </ol>

        ${Pagination({
          previous: data.pagination.href.previous,
          next: data.pagination.href.next,
          currentPage: data.pagination.pageNumber,
          totalPages: data.pagination.pages.length,
        })}
    </section>

  </div>
`;
};
