function initSearch({ appId, apiKey, indexName }) {
  const searchClient = algoliasearch(appId, apiKey);

  const search = instantsearch({
    indexName,
    searchClient,
  });

  search.addWidgets([
    instantsearch.widgets.searchBox({
      container: "#searchbox",
    }),

    instantsearch.widgets.hits({
      container: "#hits",
      templates: {
        item(hit) {
          console.log(hit);
          const isTalk = hit.watchTime !== undefined;
          const pageType = isTalk ? "talks" : "blog";
          const url = `/${pageType}/${hit.slug}/`;

          return `
          <article>
            <p>${instantsearch.highlight({ attribute: "title", highlightedTagName: "mark", hit })}</p>

            <a href="${url}" class="topicsButton" aria-label="Read ${hit.title}">
              <ul class="topicsButton__list">
                ${hit.topicsCollection.items
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
                  <li>Learn more <span class="topicsButton__arrow">→</li>
              </ul>
            </a>
          </article>
        `;
        },
      },
    }),
  ]);

  search.start();

  console.log(search.helper);
}
