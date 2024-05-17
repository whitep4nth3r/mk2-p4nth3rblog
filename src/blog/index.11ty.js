const Config = require("../../lib/config.js");
const Card = require("../_components/card");
const Pagination = require("../_components/pagination");
const Topics = require("../_components/topics");
const FilterIcon = require("../_components/svg/filterIcon");
const OpenGraph = require("../../lib/openGraph");

const pageTitle = "Blogs and tutorials";

function calculatePageUrl(data) {
  const suffix =
    data.pagination.pageNumber === 0 ? `` : `${data.pagination.pageNumber + 1}/`;
  return `https://whitep4nth3r.com/blog/${suffix}`;
}

exports.data = {
  layout: "base.html",
  pageType: "post",
  activeNav: "blog",
  metaDescription: `Salma Alam-Naylor writes and live streams about front end development. Read tutorials and quick tips on HTML, CSS, JavaScript and web dev.`,
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  pagination: {
    data: "postSummaries",
    size: Config.pagination.pageSize,
    addAllPagesToCollections: true,
  },
  permalink: (data) => {
    const trailing =
      data.pagination.pageNumber === 0 ? `` : `${data.pagination.pageNumber + 1}/`;
    return `blog/${trailing}`;
  },
  eleventyComputed: {
    title: (data) => `${pageTitle} — Page ${data.pagination.pageNumber + 1}`,
    canonical: (data) => calculatePageUrl(data),
    openGraphUrl: (data) => calculatePageUrl(data),
  },
};

exports.render = function (data) {
  const latestPost = data.latestPost;
  return /* html */ `

  <h1 class="page__headerTitle">Blogs and tutorials</h1>

  <div class="blog">
    <aside class="blog__searchAndCats">
      <div class="blog__searchBoxAndFilterToggle">
        <div id="autocomplete" class="ais">
          <div id="searchbox" class="ais__searchbox">
            <label for="search" class="ais__label">Search posts</label>
            <input id="search" data-search-input class="ais__input" type="text" />
            <button class="ais__reset" data-search-clear type="button">Clear</button>
          </div>
        </div>
        <!-- add aria stuff here -->
        <button type="button" class="blog__filterToggle" data-toggle>${FilterIcon()} Filters</button>
      </div>

      <div class="blog__cats" data-cats>
        ${Topics({ topics: data.topics })}
      </div>
    </aside>

    <section class="blog__cards">
      <div id="hits" class="ais__hitsContainer"></div>

      <div data-static-content>
        <ol class="blog__cardsGrid">
        ${data.pagination.items
          .map(function (item, index) {
            const lazy = index > 5 ? true : false;
            return `
            <li>
              ${Card({ item, showType: false, lazyLoad: lazy })}
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
  </div>

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
        date:  "${latestPost.date}",
        readingTime:  "${latestPost.readingTime}",
        topic: "${latestPost.topicsCollection.items[0].name}",
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
