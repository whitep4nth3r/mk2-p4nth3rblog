const Topics = require("../_components/topics");
const PostCard = require("../_components/postCard");
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
    title: (data) => `Posts about ${data.topic.name} from whitep4nth3r`,
    metaDescription: (data) => `Explore content about ${data.topic.name} from whitep4nth3r.`,
    openGraphImageUrl: (data) =>
      OpenGraph.generateImageUrl({ title: `Posts about ${data.topic.name} from whitep4nth3r`, topics: [data.topic] }),
    openGraphImageAlt: (data) => OpenGraph.generateImageAlt(`Posts about ${data.topic.name} from whitep4nth3r`),
    openGraphImageWidth: OpenGraph.imageWidth,
    openGraphImageHeight: OpenGraph.imageHeight,
  },
};

exports.render = function (data) {
  const { topic, topics, allPosts } = data;
  const postsByTopic = Array.from(allPosts.get(topic.slug));

  return /* html */ `
   <section>
    <div class="grid__header">
      <h1 class="grid__headerTitle">posts about <span class="colorHighlight">${topic.name.toLowerCase()}</span></h1>
    </div>

    ${Topics({ topics, selected: topic.slug, showLinkToBlog: true })}

    <ol class="grid">
    ${postsByTopic
      .map(function (item) {
        return `
        <li class="grid__item">
          ${PostCard({ post: item, baseSlug: "blog", isTalk: false })}
        </li>`;
      })
      .join("")}
    </ol>
  </section>`;
};
