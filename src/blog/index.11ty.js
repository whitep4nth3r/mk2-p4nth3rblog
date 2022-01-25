const Config = require("../../lib/config.js");
var md = require("markdown-it")({
  html: true,
});

const Topics = require("../_components/topics");
const Pagination = require("../_components/pagination");
const PublishedDate = require("../_components/publishedDate");
const OpenGraph = require("../../lib/openGraph");

const pageTitle = "Posts about web development, accessibility, Jamstack, JavaScript, and more from whitep4nth3r";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription: "Posts about web development, accessibility, Jamstack, JavaScript, and more.",
  openGraphImageUrl: OpenGraph.generateImageUrl(pageTitle),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imageWidth,
  openGraphImageHeight: OpenGraph.imageHeight,
  pagination: {
    data: "postSummaries",
    size: Config.pagination.pageSize,
  },
  permalink: (data) => {
    const trailing = data.pagination.pageNumber === 0 ? `` : `${data.pagination.pageNumber + 1}/`;
    return `blog/${trailing}`;
  },
};

exports.render = function (data) {
  return `<ol>
    ${data.pagination.items
      .map(function (item) {
        return `
        <li>
          <div>
            <a href="/blog/${item.slug}">
              <h2>${item.title}</h2>
            </a>

            ${PublishedDate({
              date: item.date,
              readingTime: item.readingTime,
              isTalk: false,
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
