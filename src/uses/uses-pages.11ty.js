const UsesCategories = require("../_components/usesCategories");
const OpenGraph = require("../../lib/openGraph");

exports.data = {
  layout: "base.html",
  pagination: {
    data: "categories",
    alias: "category",
    size: 1,
    addAllPagesToCollections: true,
  },
  permalink: (data) => {
    return `uses/${data.category}/`;
  },
  eleventyComputed: {
    title: (data) => `Things whitep4nth3r uses for ${data.category}`,
    metaDescription:
      "I receive a lot of questions on stream about my setup and what I use. So here's a list! Click on the filter buttons to view items in that category.",
    openGraphImageUrl: (data) => OpenGraph.generateImageUrl({ title: `Things whitep4nth3r uses for ${data.category}` }),
    openGraphImageAlt: (data) => OpenGraph.generateImageAlt(`Things whitep4nth3r uses for ${data.category}`),
    openGraphImageWidth: OpenGraph.imageWidth,
    openGraphImageHeight: OpenGraph.imageHeight,
  },
};

exports.render = function (data) {
  const { category, categories, allThings } = data;
  const thingsForCategory = allThings.filter((thing) => thing.categories.includes(category));

  return /* html */ `
  ${UsesCategories({ categories, selected: category })}

  <div>
    ${thingsForCategory.map((thing) => `<p>${thing.name}</p>`).join("")}
  </div>`;
};
