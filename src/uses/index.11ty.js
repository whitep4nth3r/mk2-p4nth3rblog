const AboutTableOfContents = require("../_components/aboutTableOfContents");
const OpenGraph = require("../../lib/openGraph");

const pageTitle = "Things whitep4nth3r uses for coding, streaming, and everything else";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription:
    "I receive a lot of questions on stream about my setup and what I use. So here's a (probably very incomplete) list!.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imageWidth,
  openGraphImageHeight: OpenGraph.imageHeight,
};

exports.render = function (data) {
  const { categories, things } = data;

  return /* html */ `
      <div class="twoColumnWide__header">
        <h1 class="twoColumnWide__headerTitle">things <span class="colorHighlight">I use</span></h1>
      </div>

      <div class="twoColumnWide__container">
        <aside class="twoColumnWide__aside">
          <div class="twoColumnWide__asideStickyGroup">
            ${AboutTableOfContents({ onUses: true, categories })}
          </div>
        </aside>

        <div class="twoColumnWide__content">
          <aside class="twoColumnWide__inlineAside">
            ${AboutTableOfContents({ onUses: true, categories })}
          </aside>


              ${categories
                .map(
                  (cat) => `
                <section id="${cat}">
                  <h2>${cat}</h2>
                  ${things[cat]
                    .map(
                      (thing) =>
                        `
                      <p>${thing.name}</p>
                    `,
                    )
                    .join("")}
                </section>`,
                )
                .join("")}

        </div>
      </div>
  `;
};
