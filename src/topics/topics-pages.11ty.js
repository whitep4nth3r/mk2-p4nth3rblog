const Topics = require("../_components/topics");

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
    title: (data) => data.topic.name,
    metaDescription: "AAAHHHHHHHHH",
  },
};

exports.render = function (data) {
  const { topic, topics, allPosts } = data;
  const postsByTopic = Array.from(allPosts.get(topic.slug));

  return `<div>
    ${Topics({ topics })}

    <h1>${topic.name}</h1>
    ${postsByTopic.map((post) => `<p>${post.title}</p>`).join("")}
  </div>`;
};
