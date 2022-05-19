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
    title: (data) => data.post.metaTitle,
    canonical: (data) => data.post.externalUrl || `https://whitep4nth3r.com/blog/${data.post.slug}/`,
    metaDescription: (data) => data.post.metaDescription,
    openGraphImageUrl: (data) =>
      OpenGraph.generateImageUrl({ title: data.post.title, topics: data.post.topicsCollection.items }),
    openGraphImageAlt: (data) => OpenGraph.generateImageAlt(data.post.title),
    openGraphImageWidth: OpenGraph.imgWidth,
    openGraphImageHeight: OpenGraph.imgHeight,
    openGraphUrl: (data) => data.post.externalUrl || `https://whitep4nth3r.com/blog/${data.post.slug}/`,
    openGraphTimeToRead: (data) => data.post.readingTime,
    openGraphArticleTags: (data) => data.post.topicsCollection.items.map((item) => item.name),
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
              <p class="post__relatedHeader">Related posts</p>
              <div class="post__relatedGrid">
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

        <script type="application/ld+json">${PostStructuredData({
          post,
          imageUrl: openGraphImageUrl,
        })}</script>
      </article>
    </section>
    `;
};
