const UsesCategories = require("../_components/usesCategories");
const OpenGraph = require("../../lib/openGraph");

const pageTitle = "Things whitep4nth3r uses for coding, streaming, and everything else";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription:
    "I receive a lot of questions on stream about my setup and what I use. So here's a list! Click on the filter buttons to view items in that category.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imageWidth,
  openGraphImageHeight: OpenGraph.imageHeight,
};

exports.render = function (data) {
  const { categories, allThings } = data;

  return /* html */ `
  <h1>Things whitep4nth3r uses to build stuff, learn things, and love what she does.</h1>
  
  <h2>I receive a lot of questions on stream about my setup and what I use. So here's a list! ✨ Click on the filter buttons to view items in that category.</h2>
  
  ${UsesCategories({ categories, selected: false })}
  
    <div>
      ${allThings.map((thing) => `<p>${thing.name}</p>`).join("")}
    </div>
   `;
};
