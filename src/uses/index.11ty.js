const Card = require("../_components/card");
const OpenGraph = require("../../lib/openGraph");
const pageTitle = "My desk, streaming gear and coding setup";

var md = require("markdown-it")({
  html: true,
});

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription:
    "I receive a lot of questions on stream about my setup and what I use. So here's a (probably very incomplete) list!",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/uses/",
};

exports.render = function (data) {
  const { categories, things } = data;

  return /* html */ `
    <section class="uses">
        <h1 class="page__headerTitle">${pageTitle}</h1>
        ${categories
          .map(
            (cat) => `
          <section id="${cat}">
            <h2 class="uses_catHeading" data-text="${cat}">
              ${cat} NEEDS SVG
            </h2>
            <ol class="uses__list">
            ${things[cat]
              .map(
                (thing) =>
                  `<li>
                  ${Card({ item: { ...thing, type: "thing" } })}
                </li>
              `,
              )
              .join("")}
            </ol>
          </section>`,
          )
          .join("")}
    </section>
  `;
};
