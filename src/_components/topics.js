function Topics({ topics, priorityOnly, selected, showLinkToBlog }) {
  const priority = ["jamstack", "javascript", "a11y", "webdev", "css"];
  const topicsToShow = priorityOnly === true ? topics.filter((topic) => priority.includes(topic.slug)) : topics;

  return /* html */ `
  <ul class="topics">
      ${topicsToShow
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
        ${
          priorityOnly
            ? `<li><a href="/topics/a11y" class="topics__listItemLink">More filters <span class="colorHighlight" aria-hidden="true">→</span></a></li>`
            : ""
        }
    </ul>`;
}

module.exports = Topics;
