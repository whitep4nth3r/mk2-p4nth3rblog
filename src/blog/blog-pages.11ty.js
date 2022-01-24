const ExternalUrl = require("../components/externalUrl");
const Topics = require("../components/topics");
const RichText = require("../components/richText");
const PublishedDate = require("../components/publishedDate");

exports.data = {
  layout: "base.html",
  pagination: {
    data: "posts",
    alias: "post",
    size: 1,
  },
  permalink: (data) => {
    return `blog/${data.post.slug}/`;
  },
  eleventyComputed: {
    title: (data) => data.post.title,
  },
};

exports.render = function (data) {
  const { post } = data;
  return `<div>
    <h1>${post.title}</h1>

    ${ExternalUrl({ url: post.externalUrl })}

    ${Topics({ topics: post.topicsCollection.items })}

    ${PublishedDate({
      date: post.date,
      readingTime: post.readingTime,
      isTalk: false,
      updatedDate: post.updatedDate,
    })}

    ${RichText(post.body, { renderH2Links: true })}
  </div>`;
};
