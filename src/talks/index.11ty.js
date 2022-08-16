const Config = require("../../lib/config.js");
const PostCard = require("../_components/postCard");
const Pagination = require("../_components/pagination");
const OpenGraph = require("../../lib/openGraph");

const pageTitle = "Watch talks about web development by Salma Alam-Naylor";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription: `Watch talks about web dev, accessibility, Jamstack, JavaScript, and more from ${Config.meta.jobDescription}.`,
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/talks/",
  pagination: {
    data: "talkSummaries",
    size: Config.pagination.pageSize,
    addAllPagesToCollections: true,
  },
  permalink: (data) => {
    const trailing = data.pagination.pageNumber === 0 ? `` : `${data.pagination.pageNumber + 1}/`;
    return `talks/${trailing}`;
  },
};

exports.render = function (data) {
  return /* html */ `
  
   <section class="talks__index">
      <div class="talks__header">
        <h1 class="talks__headerTitle">recorded <span class="colorHighlight">talks</span></h1>
      </div>
      
      <ol class="talks__grid">
        ${data.pagination.items
          .map(function (item) {
            return `
            <li class="talks__gridItem">
            ${PostCard({ post: item, baseSlug: "talks", isTalk: true })}
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
