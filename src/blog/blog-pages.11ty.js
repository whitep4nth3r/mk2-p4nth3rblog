const ExternalUrl = require("../_components/externalUrl");
const TopicsButton = require("../_components/topicsButton");
const RichText = require("../_components/richText");
const PublishedDate = require("../_components/publishedDate");
const ResponsiveImage = require("../_components/responsiveImage");
const OpenGraph = require("../../lib/openGraph");

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
    openGraphImageUrl: (data) =>
      OpenGraph.generateImageUrl({ title: data.post.title, topics: data.post.topicsCollection.items }),
    openGraphImageAlt: (data) => OpenGraph.generateImageAlt(data.post.title),
    openGraphImageWidth: OpenGraph.imageWidth,
    openGraphImageHeight: OpenGraph.imageHeight,
  },
};

exports.render = function (data) {
  const { post } = data;
  return /* html */ `
    <article>
      <h1>${post.title}</h1>

      ${ExternalUrl({ url: post.externalUrl })}

      ${PublishedDate({
        date: post.date,
        readingTime: post.readingTime,
        isTalk: false,
        updatedDate: post.updatedDate,
      })}

      ${RichText(post.body, { renderNativeImg: false, absoluteUrls: false, renderH2Links: true })}
    </article>
     <aside>
     <h2>SIDEBAR</h2>
      ${ResponsiveImage({ image: post.author.image })}
      <p>${post.author.name}</p>
       ${TopicsButton({ topics: post.topicsCollection.items })}
    </aside>
    `;
};
