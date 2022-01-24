const Config = require("../../lib/config.js");
// https://www.npmjs.com/package/markdown-it
var md = require("markdown-it")({
  html: true,
});

const Pagination = require("../components/pagination");

exports.data = {
  layout: "base.html",
  title: "Articles",
  pagination: {
    data: "postSummaries",
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
          <a href="/blog/${item.slug}">
            <h2>${item.title}</h2>
          </a>
            <p>${md.render(item.excerpt)}</p>
            <p>${item.date}</p>
            <p>${item.readingTime}</p>
            <ul>
              ${item.topicsCollection.items.map((topic) => `<li>${topic.name}</li>`).join("")}
            </ul>
          </div>
        </li>`;
      })
      .join("")}
      ${Pagination(data)}
   `;
};
