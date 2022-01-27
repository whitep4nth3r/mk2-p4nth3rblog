const ExternalUrl = require("../_components/externalUrl");
const BlogSidebarTopics = require("../_components/blogSidebarTopics");
const BlogSidebarAuthor = require("../_components/blogSidebarAuthor");
const RichText = require("../_components/richText");
const PublishedDate = require("../_components/publishedDate");
const TableOfContents = require("../_components/tableOfContents");
const OpenGraph = require("../../lib/openGraph");

exports.data = {
  layout: "base.html",
  pagination: {
    data: "posts",
    alias: "post",
    size: 1,
    addAllPagesToCollections: true,
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
    <section class="post">
      <aside class="post__aside">
        ${TableOfContents(post.body)}

        ${BlogSidebarTopics({ topics: post.topicsCollection.items })}

        <a href="/blog/">See all blog posts</a>

        ${BlogSidebarAuthor({ author: post.author })}

     

      </aside>
      <article class="post__article">
        <h1>${post.title}</h1>

        ${ExternalUrl({ url: post.externalUrl })}

        ${PublishedDate({
          date: post.date,
          readingTime: post.readingTime,
          isTalk: false,
          updatedDate: post.updatedDate,
        })}

        ${RichText(post.body, { renderNativeImg: false, absoluteUrls: false, renderHeadingLinks: true })}
      </article>
    </section>
    `;
};
