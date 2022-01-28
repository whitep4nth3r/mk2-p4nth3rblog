function Topics({ topics, selected }) {
  return /* html */ `
  <ul class="topics">
      ${topics
        .map((topic) => {
          const highlight = selected === topic.slug;
          return /*html*/ `<li class="topics__listItem">
              <a href="/topics/${topic.slug}/"
                class="topics__listItemLink${highlight ? " topics__listItemLink--selected" : ""}"
                aria-label="View all ${topic.name} articles">
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
    </ul>`;
}

module.exports = Topics;
