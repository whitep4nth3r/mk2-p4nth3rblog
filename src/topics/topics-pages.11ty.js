const Topics = require("../_components/topics");
const OpenGraph = require("../../lib/openGraph");

exports.data = {
  layout: "base.html",
  pagination: {
    data: "topics",
    alias: "topic",
    size: 1,
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

  return /* html */ `<div>
    ${Topics({ topics })}

    <h1>${topic.name}</h1>
    ${postsByTopic.map((post) => `<p>${post.title}</p>`).join("")}
  </div>`;
};
