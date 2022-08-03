function TopicsGroup({ topics }) {
  return /* html */ `
      <ul class="postCard__topicsGroup">
        ${topics
          .map((topic) => {
            return /*html*/ `
            <li>
              <img aria-label="${topic.name}"
                  src="${topic.icon.url}"
                  alt="${topic.icon.description}"
                  height="24"
                  width="24"
              />
            </li>`;
          })
          .join("")}
      </ul>
    `;
}

module.exports = TopicsGroup;
