const Config = require("../../lib/config");
const Topics = require("../_components/topics");
const Card = require("../_components/card");
const OpenGraph = require("../../lib/openGraph");

exports.data = {
  layout: "base.html",
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
  const { topic, topics, allPosts } = data;
  const postsByTopic = Array.from(allPosts.get(topic.slug));

  return /* html */ `

      <span>Posts tagged</span>
      <h1 class="page__headerTitle">${topic.name}</h1>

      <div class="blog">
        <aside class="blog__searchAndCats">   
          ${Topics({ topics, selected: topic.slug, showLinkToBlog: true })}
        </aside>
        
        <section class="blog__cards">
          <ol class="grid">
          ${postsByTopic
            .map(function (item) {
              return `
              <li class="grid__item blog__item">
              ${Card({ item: { ...item, type: "post" }, showType: false })}
              </li>`;
            })
            .join("")}
            </ol>
          </section>
      </div>
      `;
};
