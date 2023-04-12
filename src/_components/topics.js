function Topics({ topics, selected, showLinkToBlog, onBlogIndex }) {
  return /* html */ `
  <p class="topics__title">Blog categories</p>
  <ul class="topics">
    ${
      onBlogIndex
        ? `<li><a href="/blog/" class="topics__listItemLink topics__listItemLink--selected">View all</a></li>`
        : ""
    }
    ${showLinkToBlog ? `<li><a href="/blog/" class="topics__listItemLink">View all</a></li>` : ""}
    ${topics
      .map((topic) => {
        const highlight = selected === topic.slug;
        const ariaCurrent = selected === topic.slug ? ` aria-current="page"` : "";
        return /*html*/ `<li>
            <a href="/topics/${topic.slug}/"
              class="topics__listItemLink${highlight ? " topics__listItemLink--selected" : ""}"
              aria-label="View all ${topic.name} articles"${ariaCurrent}>
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
