const Config = require("../../lib/config.js");
// https://www.npmjs.com/package/markdown-it
var md = require("markdown-it")({
  html: true,
});

const Topics = require("../_components/topics");
const Pagination = require("../_components/pagination");
const PublishedDate = require("../_components/publishedDate");

exports.data = {
  layout: "base.html",
  title: "Talks",
  pagination: {
    data: "talkSummaries",
    size: Config.pagination.pageSize,
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
