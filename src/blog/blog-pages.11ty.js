const ExternalUrl = require("../_components/externalUrl");
const BlogSidebarTopics = require("../_components/blogSidebarTopics");
const BlogSidebarAuthor = require("../_components/blogSidebarAuthor");
const RichText = require("../_components/richText");
const PublishedDate = require("../_components/publishedDate");
const TableOfContents = require("../_components/tableOfContents");
const isSponsored = require("../_components/isSponsored");
const SeeAllCta = require("../_components/seeAllCta");
const PostCard = require("../_components/postCard");
const PostStructuredData = require("../_components/postStructuredData");
const OpenGraph = require("../../lib/openGraph");

exports.data = {
  layout: "base.html",
  pageType: "post",
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

exports.render = async function (data) {
  const { post } = data;

  const openGraphImageUrl = await OpenGraph.generateImageUrl({
    title: post.title,
    topics: post.topicsCollection.items,
  });

  return /* html */ `
    <section class="post">
      <aside class="post__aside">
      ${BlogSidebarAuthor({ author: post.author })}

        ${PublishedDate({
          date: post.date,
          readingTime: post.readingTime,
          isTalk: false,
          updatedDate: post.updatedDate,
        })}

        <div class="post__asideStickyGroup">
          ${TableOfContents(post.body)}
          ${BlogSidebarTopics({ topics: post.topicsCollection.items })}
          ${SeeAllCta({ things: "blog posts", url: "/blog/" })}
        </div>
        
      </aside>
      <article class="post__article">
        ${post.isSponsored ? isSponsored() : ""}
        ${ExternalUrl({ url: post.externalUrl })}
        <h1 class="post__h1">${post.title}</h1>

        <aside class="post__inlineAside">
            ${BlogSidebarAuthor({ author: post.author })}
            ${PublishedDate({
              date: post.date,
              readingTime: post.readingTime,
              isTalk: false,
              updatedDate: post.updatedDate,
            })}
            ${TableOfContents(post.body)}
        </aside>

        <div class="post__body">
          ${RichText(post.body, { renderRssFriendlyImg: false, absoluteUrls: false, renderHeadingLinks: true })}
        </div>

        ${
          post.relatedPostsCollection?.items.length > 0
            ? /*html*/ `
            <div class="post__related">
              <h4 class="post__relatedHeader">Related posts</h4>
              <div class="grid">
                ${post.relatedPostsCollection.items
                  .map((post) => PostCard({ post, baseSlug: "blog", isTalk: false }))
                  .join("")}
              </div>
            </div>`
            : ""
        }

        <div class="post__inlineAside">
          ${BlogSidebarTopics({ topics: post.topicsCollection.items })}
          <a href="/blog/" class="seeAllCta">See all blog posts <span class="colorHighlight">→</span></a>
        </div>

        <script type="application/ld+json" importance="low">${PostStructuredData({
          post,
          imageUrl: openGraphImageUrl,
        })}</script>
      </article>
    </section>
    `;
};
