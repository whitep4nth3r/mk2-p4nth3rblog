const Config = require("../../lib/config");
const Topics = require("../_components/topics");
const Card = require("../_components/card");
const FilterIcon = require("../_components/svg/filterIcon");
const OpenGraph = require("../../lib/openGraph");

exports.data = {
  layout: "base.html",
  activeNav: "blog",
  pagination: {
    data: "topics",
    alias: "topic",
    size: 1,
    addAllPagesToCollections: true,
  },
  permalink: (data) => {
    return `topics/${data.topic.slug}/`;
  },
  eleventyComputed: {
    title: (data) => `Posts about ${data.topic.name} from Salma Alam-Naylor`,
    metaDescription: (data) =>
      `Learn about ${data.topic.name} and more from ${Config.meta.jobDescription}.`,
    openGraphImageUrl: (data) =>
      OpenGraph.generateImageUrl({
        title: `Posts about ${data.topic.name} from Salma Alam-Naylor`,
        topics: [data.topic],
      }),
    openGraphImageAlt: (data) =>
      OpenGraph.generateImageAlt(`Posts about ${data.topic.name} from Salma Alam-Naylor`),
    openGraphImageWidth: OpenGraph.imgWidth,
    openGraphImageHeight: OpenGraph.imgHeight,
    openGraphUrl: (data) => `https://whitep4nth3r.com/topics/${data.topic.slug}/`,
  },
};

exports.render = function (data) {
  const { topic, allPosts } = data;
  const postsByTopic = Array.from(allPosts.get(topic.slug));

  return /* html */ `

      <span>Posts tagged</span>
      <h1 class="page__headerTitle">${topic.name}</h1>

      <div class="blog">
        <aside class="blog__searchAndCats">
          <div class="blog__searchBoxAndFilterToggle">
            <button type="button" class="blog__filterToggle" data-toggle>${FilterIcon()} Filters</button>
          </div>

          <div class="blog__cats" data-cats>
            ${Topics({ topics: data.topics, selected: topic.slug })}
          </div>
        </aside>
        <section class="blog__cards">
          <ol class="blog__cardsGrid">
          ${postsByTopic
            .map(function (item) {
              return `
              <li>
              ${Card({ item: { ...item, type: "post" }, showType: false })}
              </li>`;
            })
            .join("")}
            </ol>
          </section>
      </div>
      `;
};
