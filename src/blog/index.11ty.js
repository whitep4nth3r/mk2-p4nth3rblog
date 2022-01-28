const Config = require("../../lib/config.js");

const Pagination = require("../_components/pagination");
const PostCard = require("../_components/postCard");
const Topics = require("../_components/topics");
const OpenGraph = require("../../lib/openGraph");

const pageTitle = "Posts about web development, accessibility, Jamstack, JavaScript, and more from whitep4nth3r";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription: "Posts about web development, accessibility, Jamstack, JavaScript, and more.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imageWidth,
  openGraphImageHeight: OpenGraph.imageHeight,
  pagination: {
    data: "postSummaries",
    size: Config.pagination.pageSize,
    addAllPagesToCollections: true,
  },
  permalink: (data) => {
    const trailing = data.pagination.pageNumber === 0 ? `` : `${data.pagination.pageNumber + 1}/`;
    return `blog/${trailing}`;
  },
};

exports.render = function (data) {
  return /* html */ `

  <section>
    <div class="grid__header">
      <h1 class="grid__headerTitle">learn <span class="colorHighlight">things</span></h1>
    </div>

    ${Topics({ topics: data.topics })}

    <ol class="postGrid">
    ${data.pagination.items
      .map(function (item) {
        return `
        <li class="postGrid__item">
          ${PostCard({ post: item, baseSlug: "blog", isTalk: false })}
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
   `;
};
