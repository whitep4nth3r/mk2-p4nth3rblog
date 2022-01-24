const ExternalUrl = require("../_components/externalUrl");
const Topics = require("../_components/topics");
const RichText = require("../_components/richText");
const PublishedDate = require("../_components/publishedDate");
const ResponsiveImage = require("../_components/responsiveImage");

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
    metaDescription: (data) => data.post.excerpt,
  },
};

exports.render = function (data) {
  const { post } = data;
  return `
  <div>
    <article>
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
    </article>
     <aside>
      ${ResponsiveImage({ image: post.author.image })}
      <p>${post.author.name}</p>
    </aside>
  <div>`;
};
