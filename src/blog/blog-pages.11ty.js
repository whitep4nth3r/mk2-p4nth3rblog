const ExternalUrl = require("../_components/externalUrl");
const BlogSidebarTopics = require("../_components/blogSidebarTopics");
const BlogSidebarAuthor = require("../_components/blogSidebarAuthor");
const RichText = require("../_components/richText");
const PublishedDate = require("../_components/publishedDate");
const TableOfContents = require("../_components/tableOfContents");
const isSponsored = require("../_components/isSponsored");
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
    canonical: (data) => data.post.externalUrl || false,
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

  // todo
  // external link
  // sponsored

  return /* html */ `
    <section class="post">
      <aside class="post__aside">

       ${PublishedDate({
         date: post.date,
         readingTime: post.readingTime,
         isTalk: false,
         updatedDate: post.updatedDate,
       })}

        ${TableOfContents(post.body)}

        ${post.isSponsored ? isSponsored() : ""}

        <div class="post__asideGroup">
          ${ExternalUrl({ url: post.externalUrl })}
          ${BlogSidebarTopics({ topics: post.topicsCollection.items })}
        </div>
        
        <a href="/blog/">See all blog posts</a>

        ${BlogSidebarAuthor({ author: post.author })}

      </aside>
      <article class="post__article">
        <h1 class="post__h1">${post.title}</h1>       
        ${RichText(post.body, { renderNativeImg: false, absoluteUrls: false, renderHeadingLinks: true })}
      </article>
    </section>
    `;
};
