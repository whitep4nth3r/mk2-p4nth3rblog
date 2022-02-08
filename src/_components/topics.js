function Topics({ topics, selected, showLinkToBlog }) {
  return /* html */ `
  <ul class="topics">
      ${topics
        .map((topic) => {
          const highlight = selected === topic.slug;
          const ariaCurrent = selected === topic.slug ? ` aria-current="page"` : "";
          return /*html*/ `<li>
              <a href="/topics/${topic.slug}/"
                class="topics__listItemLink${highlight ? " topics__listItemLink--selected" : ""}"
                aria-label="View all ${topic.name} articles"${ariaCurrent}>
                <span class="topics__listItemImg">
                  ${
                    topic.icon
                      ? `<img
                      aria-hidden="true"
                      src="${topic.icon.url}"
                      alt="${topic.icon.description}"
                      height="16"
                      width="16"
                    />`
                      : ""
                  }
                </span>
                <span class="topics__listItemName">
                ${topic.name}
                </span>
              </a>
          </li>`;
        })
        .join("")}
        ${
          showLinkToBlog
            ? `<li><a href="/blog/" class="topics__listItemLink">View latest <span class="colorHighlight" aria-hidden="true">→</span></a></li>`
            : ""
        }
    </ul>`;
}

module.exports = Topics;
