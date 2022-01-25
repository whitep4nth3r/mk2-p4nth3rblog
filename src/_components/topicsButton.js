function TopicsButton({ topics }) {
  return `
    <a href="/topics/">
      <ul>
        ${topics
          .map((topic) => {
            return `
            <li>
              <img aria-label="${topic.name}"
                  src="${topic.icon.url}"
                  alt="${topic.icon.description}"
                  height="16"
                  width="16"
              />
            </li>`;
          })
          .join("")}
      </ul>
      <span>learn more</span>
    </a>
    `;
}

module.exports = TopicsButton;
