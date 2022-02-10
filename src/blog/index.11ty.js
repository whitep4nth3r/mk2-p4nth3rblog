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
    <div class="blog__header">
      <h1 class="blog__headerTitle">learn <span class="colorHighlight">things</span></h1>
    </div>

    <div class="blog__searchAndFilters">
      <div id="autocomplete" class="ais">
        <div id="searchbox" class="ais__searchbox"></div>
      </div>

      <div>
        <p class="blog__filterLabel">Filter posts</p>
        ${Topics({ topics: data.topics, priorityOnly: true })}
      </div>
    </div>

    <div id="hits" class="ais__hitsContainer"></div>

    <div data-static-content>
      <ol class="blog__grid">
      ${data.pagination.items
        .map(function (item) {
          return `
          <li class="blog__gridItem">
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
    </div>
  </section>

  <script src="https://cdn.jsdelivr.net/npm/algoliasearch@4.5.1/dist/algoliasearch-lite.umd.js" integrity="sha256-EXPXz4W6pQgfYY3yTpnDa3OH8/EPn16ciVsPQ/ypsjk=" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/instantsearch.js@4.8.3/dist/instantsearch.production.min.js" integrity="sha256-LAGhRRdtVoD6RLo2qDQsU2mp+XVSciKRC8XPOBWmofM=" crossorigin="anonymous"></script>
  <script src="/js/app_search.js"></script>

  <script type="module">
    const search = initSearch({
      appId: "${data.search.ALGOLIA_APP_ID}", 
      apiKey: "${data.search.ALGOLIA_SEARCH_API_KEY}", 
      indexName: "${data.search.ALGOLIA_INDEX}"
    });

    const searchBox = document.getElementById("searchbox");
    const hits = document.getElementById("hits");
    const staticContent = document.querySelector("[data-static-content]");

    searchBox.addEventListener("keyup", function(e) { 
      if (e.target.value.length >= 1) {
        hits.style.display = "block";
        staticContent.style.display = "none";
      } else {
        hits.style.display = "none";
        staticContent.style.display = "block";
      }
    })
  </script>
`;
};
