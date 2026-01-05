const Card = require("../_components/card");
const OpenGraph = require("../../lib/openGraph");
const pageTitle = "My desk and coding setup";

var md = require("markdown-it")({
  html: true,
});

exports.data = {
  layout: "base.html",
  title: pageTitle,
  pageType: "uses",
  metaDescription: "Here's what's on my desk.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/uses/",
  includeInSitemap: true,
};

exports.render = function (data) {
  const { categories, things } = data;

  return /* html */ `
    <section class="uses">
        <h1 class="page__header">${pageTitle}</h1>
        <p class="page__text"><em>Buy this thing</em> links will earn me a small commission.</p>
        ${categories
          .map(
            (cat) => `
          <section id="${cat}">
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
