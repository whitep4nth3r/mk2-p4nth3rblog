const Config = require("../../lib/config.js");
// https://www.npmjs.com/package/markdown-it
var md = require("markdown-it")({
  html: true,
});

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
    <nav aria-labelledby="pagination">
    <ol>
      <li>${
        data.pagination.href.previous
          ? `<a href="${data.pagination.href.previous}">Previous</a>`
          : `Previous`
      }</li>
      ${data.pagination.pages
        .map(function (item, index) {
          return `<li><a href="${
            data.pagination.hrefs[index]
          }" ${data.pagination.hrefs[index] ? 'aria-current="page"' : ""}>Page ${index + 1}</a></li>`;
        })
        .join("")}
      <li>${
        data.pagination.href.next ? `<a href="${data.pagination.href.next}">Next</a>` : `Next`
      }</li>
    </ol>
  </nav>`;
};
