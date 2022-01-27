function TopicsButton({ topics }) {
  return /* html */ `
    <a href="/topics/" class="topicsButton">
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
          <li>Learn more</li>
      </ul>
    </a>
    `;
}

module.exports = TopicsButton;
