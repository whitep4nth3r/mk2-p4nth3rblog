function BlogSidebarTopics({ topics }) {
  return /* html */ `<ul class="blogSidebarTopics">
      ${topics
        .map((topic) => {
          return /*html*/ `<li class="blogSidebarTopics__item">
              <a href="/topics/${topic.slug}/"
                aria-label="View all ${topic.name} articles"
                class="blogSidebarTopics__itemLink">
                <img
                  aria-hidden="true"
                  src="${topic.icon.url}"
                  alt="${topic.icon.description}"
                  height="16"
                  width="16"
                  class="blogSidebarTopics__itemIcon">
                More on ${topic.name}
              </a>
          </li>`;
        })
        .join("")}
    </ul>`;
}

module.exports = BlogSidebarTopics;
