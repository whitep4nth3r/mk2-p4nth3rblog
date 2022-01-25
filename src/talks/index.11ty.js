const Config = require("../../lib/config.js");
var md = require("markdown-it")({
  html: true,
});

const Topics = require("../_components/topics");
const Pagination = require("../_components/pagination");
const PublishedDate = require("../_components/publishedDate");
const OpenGraph = require("../../lib/openGraph");

const pageTitle = "Talks about web development, accessibility, Jamstack, JavaScript, and more from whitep4nth3r";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription: "Talks about web development, accessibility, Jamstack, JavaScript, and more.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imageWidth,
  openGraphImageHeight: OpenGraph.imageHeight,
  pagination: {
    data: "talkSummaries",
    size: Config.pagination.pageSize,
  },
  permalink: (data) => {
    const trailing = data.pagination.pageNumber === 0 ? `` : `${data.pagination.pageNumber + 1}/`;
    return `talks/${trailing}`;
  },
};

exports.render = function (data) {
  return `<ol>
    ${data.pagination.items
      .map(function (item) {
        return `
        <li>
          <div>
          <a href="/talks/${item.slug}">
            <h2>${item.title}</h2>
          </a>

          ${PublishedDate({
            date: item.date,
            readingTime: item.watchTime,
            isTalk: true,
            updatedDate: item.updatedDate,
          })}

            <p>${md.render(item.excerpt)}</p>

            ${Topics({ topics: item.topicsCollection.items })}
          </div>
        </li>`;
      })
      .join("")}
       ${Pagination({
         previous: data.pagination.href.previous,
         next: data.pagination.href.next,
         currentPage: data.pagination.pageNumber,
         totalPages: data.pagination.pages.length,
       })}
   `;
};
