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

function TopicsButton({ topics, url, ariaLabel }) {
  return /* html */ `
    <a href="${url}" class="topicsButton" aria-label="${ariaLabel}">
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

function PostCard({ post, postTitle, baseSlug, isTalk }) {
  const timeSuffix = isTalk ? "watch time" : "read";
  return /*html*/ `
    <article class="postCard">
        <p class="postCard__meta">
          <span class="postCard__metaIcon">${LightningIcon()}</span>
          <time dateTime="${formatDateForDateTime(post.date)}">
            ${formatDateForDisplay(post.date)}
          </time>
          <span class="postCard__metaIcon">•</span>
          <span>${post.readingTime || post.watchTime} min ${timeSuffix}</span>
        </p>
        <a href="/${baseSlug}/${post.slug}" class="postCard__titleLink">
          ${instantsearch.highlight({ attribute: "title", post })}
        </a>
        <div class="postCard__topics">
          ${TopicsButton({
            topics: post.topicsCollection.items,
            url: `/${baseSlug}/${post.slug}/`,
            ariaLabel: `Read ${post.title}`,
          })}
        </div>
      </article>
  `;
}

function initSearch({ appId, apiKey, indexName }) {
  const searchClient = algoliasearch(appId, apiKey);

  const search = instantsearch({
    indexName,
    searchClient,
  });

  search.addWidgets([
    instantsearch.widgets.searchBox({
      container: "#searchbox",
      showLoadingIndicator: false,
      placeholder: "Search posts",
      autofocus: true,
      showReset: false,
      searchAsYouType: true,
      showSubmit: false,
      cssClasses: {
        root: "ais",
        form: "ais__form",
        input: "ais__input",
        reset: "ais__reset",
      },
      templates: {
        reset() {
          return "reset";
        },
      },
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
          console.log(hit);
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
        <a href="/${baseSlug}/${hit.slug}" class="postCard__titleLink postCard__titleLink--ais">
          ${instantsearch.highlight({ attribute: "title", hit })}
        </a>
        <div class="postCard__topics">
          ${TopicsButton({
            topics: hit.topicsCollection.items,
            url: `/${baseSlug}/${hit.slug}/`,
            ariaLabel: `Read ${hit.title}`,
          })}
        </div>
      </article>
          `;
        },
      },
    }),
  ]);

  search.start();

  console.log(search.helper);
}
