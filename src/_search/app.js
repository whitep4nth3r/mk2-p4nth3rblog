//THERE IS A LOT OF REPEATED CODE HERE — FIX!

function LightningIcon() {
  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      height="16"
      width="16"
      role="img"
      aria-label="Lightening icon"
    >
    <path fill="currentColor" d="M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 15.2 8 29.5 23.3 29.5 8.4 0 16.4-4.4 20.8-12l176-304c9.3-15.9-2.2-36-20.7-36z"></path>
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

function formatDateForDateTime(dateString) {
  const timestamp = Date.parse(dateString);
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${addLeadingZero(date.getMonth() + 1)}-${date.getDate()}`;
}

function formatDateForDisplay(dateString) {
  const timestamp = Date.parse(dateString);
  const date = new Date(timestamp);
  return `${date.getDate()} ${getMonthStringFromInt(date.getMonth())} ${date.getFullYear()}`;
}

function TopicsButton({ topics, url, ariaDescribedBy }) {
  return /* html */ `
    <a href="${url}" class="topicsButton" aria-describedby="${ariaDescribedBy}">
      <ul class="topicsButton__list">
        ${topics
          .map((topic) => {
            return /*html*/ `
            <li class="topicsButton__listItem">
              <img aria-label="${topic.name}"
                  src="${topic.icon.url}"
                  alt="${topic.icon.description}"
                  height="24"
                  width="24"
              />
            </li>`;
          })
          .join("")}
          <li>Learn more <span class="topicsButton__arrow" aria-hidden="true">→</li>
      </ul>
    </a>
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

function initSearch({ appId, apiKey, indexName }) {
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
        list: "ais__hitsList",
        item: "ais__hitsListItem",
      },
      templates: {
        empty(results) {
          return `<p class="ais__emptyMessage">No results found for <q>${results.query}</q>.</p>`;
        },
        item(hit) {
          const isTalk = hit.watchTime !== undefined;
          const baseSlug = isTalk ? "talks" : "blog";
          const timeSuffix = isTalk ? "watch time" : "read";

          return `
          <article class="postCard">
        <p class="postCard__meta">
          <span class="postCard__metaIcon">${LightningIcon()}</span>
          <time dateTime="${formatDateForDateTime(hit.date)}">
            ${formatDateForDisplay(hit.date)}
          </time>
          <span class="postCard__metaIcon">•</span>
          <span>${hit.readingTime || hit.watchTime} min ${timeSuffix}</span>
        </p>
        <a href="/${baseSlug}/${hit.slug}" class="postCard__titleLink postCard__titleLink--ais" id="search-${
            hit.objectID
          }">
          ${instantsearch.highlight({ attribute: "title", hit })}
        </a>
        <div class="postCard__topics">
          ${TopicsButton({
            topics: hit.topicsCollection.items,
            url: `/${baseSlug}/${hit.slug}/`,
            ariaDescribedBy: `search-${hit.objectID}`,
          })}
        </div>
      </article>
          `;
        },
      },
    }),
  ]);

  search.start();
}
