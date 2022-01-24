function UsesCategories({ categories, selected }) {
  return `<ul>
      ${categories
        .map((cat) => {
          // const isSelectedClass =
          //   selected !== undefined && cat === selected
          //     ? TopicsStyles.topics__topicSelected
          //     : "";

          return `<li>
              <a href="/uses/${cat}/"
                aria-label="View all ${cat} things">
                ${cat}
              </a>
            </Link>
          </li>`;
        })
        .join("")}
    </ul>`;
}

module.exports = UsesCategories;
