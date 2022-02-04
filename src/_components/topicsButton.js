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
          <li>Learn more <span class="topicsButton__arrow">→</li>
      </ul>
    </a>
    `;
}

module.exports = TopicsButton;
