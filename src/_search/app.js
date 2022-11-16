//THERE IS A LOT OF REPEATED CODE HERE — FIX!

function CalendarIcon() {
  return /*html*/ `
    <svg
      xmlns="https://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      height="20"
      width="20"
      role="img"
      aria-label="Calendar icon"
    >
      <path fill="currentColor" d="M400 64h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V160h352v298c0 3.3-2.7 6-6 6z"></path>
    </svg>
  `;
}

function StopwatchIcon() {
  return /*html*/ `
    <svg
      xmlns="https://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height="24"
      width="24"
      role="img"
      fill="none"
      aria-label="Stopwatch"
    >
      <path d="M12 21C16.4183 21 20 17.4183 20 13C20 8.58172 16.4183 5 12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21Z" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11 13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13H11ZM13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9H13ZM13 13V9H11V13H13Z" fill="currentColor"/>
      <path d="M21 6L19 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 2L14 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}

function getMonthStringFromInt(int) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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

function TopicsGroup({ topics }) {
  return /* html */ `
      <ul class="postCard__topicsGroup">
        ${topics
          .map((topic) => {
            return /*html*/ `
            <li>
              <img aria-label="${topic.name}"
                  src="${topic.icon.url}"
                  alt="${topic.icon.description}"
                  height="24"
                  width="24"
              />
            </li>`;
          })
          .join("")}
      </ul>
    `;
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
    button.textContent = "clear";

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
        list: "grid",
        item: "blog__item",
      },
      templates: {
        empty(results) {
          return `
          <p class="ais__emptyMessage">No results found for <q>${results.query}</q>!</p>
          <p class="ais__howAbout">How about this? 👇</p>
          <div class="blog__item blog__item--ais">
            <a href="/blog/${latestPost.slug}/" aria-label="${latestPost.title}" class="postCard">
            <div class="postCard__imageWrap">
            <img class="postCard__image" src="${latestPost.featuredImage.url}" alt="${
            latestPost.featuredImage.description
          }" height="${latestPost.featuredImage.height}" width="${latestPost.featuredImage.width}" />
            </div>
            <h2 class="postCard__title">
            ${latestPost.title}
            </h2>

            <p class="postCard__meta">
              <span class="postCard__metaIcon">${CalendarIcon()}</span>
              <span class="postCard__metaText">${formatDateForDisplay(latestPost.date)}</span>
              <span class="postCard__metaIcon">${StopwatchIcon()}</span>
              <span class="postCard__metaText">${latestPost.readingTime} min read</span>
            </p>
            </a>
          </div>
          `;
        },
        item(hit) {
          const isTalk = hit.watchTime !== undefined;
          const baseSlug = isTalk ? "talks" : "blog";
          const timeSuffix = isTalk ? "watch time" : "read";

          return `
          <a href="${`/${baseSlug}/${hit.slug}/`}" 
            aria-label="${hit.title}"
            id="search-${hit.objectID}"
            class="postCard">
          <div class="postCard__imageWrap">
            ${TopicsGroup({ topics: hit.topicsCollection.items })}
            <img
              class="postCard__image"
              src="${hit.featuredImage.url}?w=320"
              alt="${hit.featuredImage.description}"
              height="${hit.featuredImage.height}"
              width="${hit.featuredImage.width}"
              loading="lazy"
            />
          </div>
        <h2 class="postCard__title">
          ${instantsearch.highlight({ attribute: "title", hit })}
        </h2>

        <p class="postCard__meta">
          <span class="postCard__metaIcon">${CalendarIcon()}</span>
          <span class="postCard__metaText">${formatDateForDisplay(hit.date)}</span>
          <span class="postCard__metaIcon">${StopwatchIcon()}</span>
          <span class="postCard__metaText">${hit.readingTime || hit.watchTime} min ${timeSuffix}</span>
        </p>
      </a>
          `;
        },
      },
    }),
  ]);

  search.start();
}
