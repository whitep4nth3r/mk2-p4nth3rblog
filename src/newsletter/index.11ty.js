const OpenGraph = require("../../lib/openGraph");
const pageTitle = "Newsletter archive";
const Pagination = require("../_components/pagination");

var md = require("markdown-it")({
  html: true,
});

function shiftHeadings(html = "") {
  return html
    .replace(/<h1/g, "<h2")
    .replace(/<\/h1>/g, "</h2>")
    .replace(/<h2/g, "<h3")
    .replace(/<\/h2>/g, "</h3>");
}

exports.data = {
  layout: "base.html",
  title: pageTitle,
  pageType: "newsletter",
  metaDescription: "dfsdfsdfsdfsdfsdfsdf",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/newsletter/",
  includeInSitemap: true,
  sitemapChangeFreq: "weekly",
  sitemapPriority: "0.5",
  pagination: {
    data: "emails",
    size: 5,
    addAllPagesToCollections: true,
  },
};

function renderEmailBody(body = "") {
  if (!body) return "";

  const isMarkdown = body.includes("<!-- buttondown-editor-mode: fancy -->");

  // Strip comment
  let cleanBody = body.replace(/<!-- buttondown-editor-mode: (?:fancy|plaintext) -->/i, "");

  // Remove all leading spaces from each line
  cleanBody = cleanBody
    .split("\n")
    .map((line) => line.replace(/^\s+/, ""))
    .join("\n");

  return isMarkdown ? md.render(cleanBody) : cleanBody;
}

// truncate at "weird" so only poem shows
// deal with plaintext vs fancy

exports.render = function (data) {
  const { pagination } = data;

  return /* html */ `
    <section class="uses">
        <h1 class="page__header">Newsletter archive</h1>
        <ol>
          ${pagination.items
            .map(
              (email) =>
                `<li>
                <a href="/newsletter/${email.slug}/">${email.subject}</a>
                <div>
                  ${renderEmailBody(email.body)}
                </div>
              </li>
            `,
            )
            .join("")}
          </ol>
    </section>

    ${Pagination({
      previous: pagination.href.previous,
      next: pagination.href.next,
      currentPage: pagination.pageNumber,
      totalPages: pagination.pages.length,
    })}
  `;
};
