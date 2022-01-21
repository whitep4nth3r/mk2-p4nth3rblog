function Topics(topics, selected) {
  return `<ul>
      ${topics
        .map((topic) => {
          // const isSelectedClass =
          //   selected !== undefined && topic.slug === selected.slug
          //     ? TopicsStyles.topics__topicSelected
          //     : "";

          return `<li>
              <a href="/topics/${topic.slug}"
                aria-label="View all ${topic.name} articles">
                <span>
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
                ${topic.name}
              </a>
            </Link>
          </li>`;
        })
        .join("")}
    </ul>`;
}

module.exports = Topics;
