//THERE IS A LOT OF REPEATED CODE HERE — FIX!

function getMonthStringFromInt(int) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months[int];
}

function addLeadingZero(num) {
  num = num.toString();
  while (num.length < 2) num = "0" + num;
  return num;
}

function formatDateForDisplay(dateString) {
  const timestamp = Date.parse(dateString);
  const date = new Date(timestamp);
  return `${date.getDate()} ${getMonthStringFromInt(
    date.getMonth(),
  )} ${date.getFullYear()}`;
}

const activateSearchElements = (renderOptions, isFirstRender) => {
  const { refine, clear } = renderOptions;

  if (isFirstRender) {
    const input = document.querySelector("[data-search-input]");
    const button = document.querySelector("[data-search-clear]");

    input.addEventListener("input", (event) => {
      refine(event.target.value);
    });

    button.addEventListener("click", () => {
      clear();
    });
  }
};

function initSearch({ appId, apiKey, indexName, latestPost }) {
  const searchClient = algoliasearch(appId, apiKey);

  const search = instantsearch({
    indexName,
    searchClient,
  });

  // create custom widget
  const customSearchBox = instantsearch.connectors.connectSearchBox(
    activateSearchElements,
  );

  search.addWidgets([
    customSearchBox({
      container: document.querySelector("#searchbox"),
    }),

    instantsearch.widgets.hits({
      container: "#hits",
      cssClasses: {
        root: "ais__hits",
        emptyRoot: "ais__hits--empty",
        list: "blog__cardsGrid",
        item: "",
      },
      templates: {
        empty(results) {
          return `
          <p class="ais__emptyMessage">No results found for <q>${
            results.query
          }</q>!</p>
          <p class="ais__howAbout">How about this latest blog post?</p>
          <div class="blog__emptySearchCard">
            <a href="/blog/${latestPost.slug}/" aria-label="${
            latestPost.title
          }" class="card">
            <div class="card__imageContainer">
              <img 
                src="${latestPost.featuredImage.url}?w=300" 
                alt="" 
                height="${latestPost.featuredImage.height}"
                width="${latestPost.featuredImage.width}"
                class="card__image" />
            </div>
            <div class="card__inner">
              <p class="card__date">${formatDateForDisplay(latestPost.date)}</p>
              <h2 class="card__title">${latestPost.title}</h2>

              <div class="card__meta">
                <span class="card__metaLabel">${latestPost.topic}</span>
                <span class="card__metaRead">${
                  latestPost.readingTime
                } min read →</span>
              </div>
            </div>
            </a>
          </div>
          `;
        },
        item(hit) {
          const isTalk = hit.watchTime !== undefined;
          const baseSlug = isTalk ? "talks" : "blog";
          const timeSuffix = isTalk ? "min watch time" : "min read";

          return `
          <a href="${`/${baseSlug}/${hit.slug}/`}" 
            aria-label="${hit.title}"
            id="search-${hit.objectID}"
            class="card">

            ${
              hit.featuredImage
                ? `<div class="card__imageContainer">
              <img 
                src="${hit.featuredImage.url}?w=300" 
                alt="" 
                height="${hit.featuredImage.height}"
                width="${hit.featuredImage.width}"
                class="card__image"
                loading="lazy" />
            </div>`
                : ``
            }

            <div class="card__inner">
              <p class="card__date">${formatDateForDisplay(hit.date)}</p>
              <h2 class="card__title">${instantsearch.highlight({
                attribute: "title",
                hit,
              })}</h2>

              <div class="card__meta">
                <span class="card__metaLabel">${
                  hit.topicsCollection.items[0].name
                }</span>
                <span class="card__metaRead">${
                  isTalk ? hit.watchTime : hit.readingTime
                } ${timeSuffix} →</span>
              </div>
            </div>
          </a>
          `;
        },
      },
    }),
  ]);

  search.start();
}
