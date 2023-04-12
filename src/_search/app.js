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
  return `${date.getDate()} ${getMonthStringFromInt(date.getMonth())} ${date.getFullYear()}`;
}

// Create a render function
const renderSearchBox = (renderOptions, isFirstRender) => {
  const { query, refine, clear, isSearchStalled, widgetParams } = renderOptions;

  if (isFirstRender) {
    const label = document.createElement("label");
    label.setAttribute("for", "search");
    label.classList = "ais__label";
    label.innerText = "Search posts";

    const input = document.createElement("input");
    input.setAttribute("id", "search");
    input.classList = "ais__input";

    const button = document.createElement("button");
    button.classList = "ais__reset";
    button.textContent = "Clear";

    input.addEventListener("input", (event) => {
      refine(event.target.value);
    });

    button.addEventListener("click", () => {
      clear();
    });

    widgetParams.container.appendChild(label);
    widgetParams.container.appendChild(input);
    widgetParams.container.appendChild(button);
  }

  widgetParams.container.querySelector("input").value = query;
};

function initSearch({ appId, apiKey, indexName, latestPost }) {
  const searchClient = algoliasearch(appId, apiKey);

  const search = instantsearch({
    indexName,
    searchClient,
  });

  // create custom widget
  const customSearchBox = instantsearch.connectors.connectSearchBox(renderSearchBox);

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
          <p class="ais__emptyMessage">No results found for <q>${results.query}</q>!</p>
          <p class="ais__howAbout">How about this latest blog post?</p>
          <div class="blog__emptySearchCard">
            <a href="/blog/${latestPost.slug}/" aria-label="${latestPost.title}" class="card">
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
                <span class="card__metaRead">${latestPost.readingTime} min read →</span>
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
          const image = hit.featuredImage || hit.screenshot;

          console.log(hit);

          return `
          <a href="${`/${baseSlug}/${hit.slug}/`}" 
            aria-label="${hit.title}"
            id="search-${hit.objectID}"
            class="card">

            <div class="card__imageContainer">
              <img 
                src="${image.url}?w=300" 
                alt="" 
                height="${image.height}"
                width="${image.width}"
                class="card__image"
                loading="lazy" />
            </div>

            <div class="card__inner">
              <p class="card__date">${formatDateForDisplay(hit.date)}</p>
              <h2 class="card__title">${instantsearch.highlight({ attribute: "title", hit })}</h2>

              <div class="card__meta">
                <span class="card__metaLabel">${hit.topicsCollection.items[0].name}</span>
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
