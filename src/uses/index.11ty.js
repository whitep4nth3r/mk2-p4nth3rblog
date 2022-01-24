const UsesCategories = require("../_components/usesCategories");

exports.data = {
  layout: "base.html",
  title: "Uses",
};

exports.render = function (data) {
  const { categories, allThings } = data;

  return `
    ${UsesCategories({ categories, selected: false })}

    <div>
      ${allThings.map((thing) => `<p>${thing.name}</p>`).join("")}
    </div>
   `;
};
