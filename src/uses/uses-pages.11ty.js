const UsesCategories = require("../_components/usesCategories");

exports.data = {
  layout: "base.html",
  pagination: {
    data: "categories",
    alias: "category",
    size: 1,
  },
  permalink: (data) => {
    return `uses/${data.category}/`;
  },
  eleventyComputed: {
    title: (data) => data.category,
  },
};

exports.render = function (data) {
  const { category, categories, allThings } = data;
  const thingsForCategory = allThings.filter((thing) => thing.categories.includes(category));

  return `
  ${UsesCategories({ categories, selected: category })}

  <div>
    ${thingsForCategory.map((thing) => `<p>${thing.name}</p>`).join("")}
  </div>`;
};
