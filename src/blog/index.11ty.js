const Config = require("../../lib/config.js");

const Pagination = require("../_components/pagination");
const PostCard = require("../_components/postCard");
const Topics = require("../_components/topics");
const OpenGraph = require("../../lib/openGraph");

const pageTitle = "Learn web development, CSS, Jamstack, JavaScript and more";

function calculatePageUrl(data) {
  const suffix = data.pagination.pageNumber === 0 ? `` : `${data.pagination.pageNumber + 1}/`;
  return `https://whitep4nth3r.com/blog/${suffix}`;
}

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription: `Learn about web development, accessibility, Jamstack, JavaScript, and more from ${Config.meta.jobDescription}.`,
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
  eleventyComputed: {
    canonical: (data) => calculatePageUrl(data),
    openGraphUrl: (data) => calculatePageUrl(data),
  },
};

exports.render = function (data) {
  const latestPost = data.latestPost.post;
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

  <script defer src="https://cdn.jsdelivr.net/npm/algoliasearch@4.5.1/dist/algoliasearch-lite.umd.js" integrity="sha256-EXPXz4W6pQgfYY3yTpnDa3OH8/EPn16ciVsPQ/ypsjk=" crossorigin="anonymous"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/instantsearch.js@4.8.3/dist/instantsearch.production.min.js" integrity="sha256-LAGhRRdtVoD6RLo2qDQsU2mp+XVSciKRC8XPOBWmofM=" crossorigin="anonymous"></script>
  <script defer src="/js/app_search.js"></script>

  <script type="module">
    const search = initSearch({
      appId: "${data.search.ALGOLIA_APP_ID}", 
      apiKey: "${data.search.ALGOLIA_SEARCH_API_KEY}", 
      indexName: "${data.search.ALGOLIA_INDEX}",
      latestPost: {
        title:  "${latestPost.title}",
        slug: "${latestPost.slug}",
        id: "${latestPost.sys.id}",
        featuredImage: {
          url: "${latestPost.featuredImage.url}",
          description: "${latestPost.featuredImage.description}",
          width: "${latestPost.featuredImage.width}",
          height: "${latestPost.featuredImage.height}",
        }
      }
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
