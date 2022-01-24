const UsesCategories = require("../_components/usesCategories");

exports.data = {
  layout: "base.html",
  title: "Uses",
  metaDescription:
    "I receive a lot of questions on stream about my setup and what I use. So here's a list! Click on the filter buttons to view items in that category.",
};

exports.render = function (data) {
  const { categories, allThings } = data;

  return `
  <h1>Things whitep4nth3r uses to build stuff, learn things, and love what she does.</h1>
  
  <h2>I receive a lot of questions on stream about my setup and what I use. So here's a list! ✨ Click on the filter buttons to view items in that category.</h2>
  
  ${UsesCategories({ categories, selected: false })}
  
    <div>
      ${allThings.map((thing) => `<p>${thing.name}</p>`).join("")}
    </div>
   `;
};
