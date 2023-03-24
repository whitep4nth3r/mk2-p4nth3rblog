const ExternalUrl = require("../_components/externalUrl");
const BlogSidebarTopics = require("../_components/blogSidebarTopics");
const BlogSidebarAuthor = require("../_components/blogSidebarAuthor");
const BlogSidebarSocialLinks = require("../_components/blogSidebarSocialLinks");
const RichText = require("../_components/richText");
const PublishedDate = require("../_components/publishedDate");
const TableOfContents = require("../_components/tableOfContents");
const isSponsored = require("../_components/isSponsored");
const Card = require("../_components/card");
const PostStructuredData = require("../_components/postStructuredData");
const OpenGraph = require("../../lib/openGraph");

exports.data = {
  layout: "base.html",
  pageType: "post",
  activeNav: "blog",
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
    title: (data) => `${data.post.metaTitle} - Salma Alam-Naylor`,
    slug: (data) => data.post.slug,
    canonical: (data) =>
      data.post.externalUrl || `https://whitep4nth3r.com/blog/${data.post.slug}/`,
    metaDescription: (data) => data.post.metaDescription,
    openGraphImageUrl: (data) =>
      OpenGraph.generateImageUrl({
        title: data.post.title,
        topics: data.post.topicsCollection.items,
      }),
    openGraphImageAlt: (data) => OpenGraph.generateImageAlt(data.post.title),
    openGraphImageWidth: OpenGraph.imgWidth,
    openGraphImageHeight: OpenGraph.imgHeight,
    openGraphUrl: (data) =>
      data.post.externalUrl || `https://whitep4nth3r.com/blog/${data.post.slug}/`,
    openGraphTimeToRead: (data) => data.post.readingTime,
    openGraphArticleTags: (data) => data.post.topicsCollection.items.map((item) => item.name),
  },
};

function outOfDateWarning({ post }) {
  if (post.hideOutOfDateWarning) {
    return "";
  }

  const today = new Date();
  const createdOn = new Date(post.date);
  const msInDay = 24 * 60 * 60 * 1000;

  createdOn.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diff = (+today - +createdOn) / msInDay;
  const outOfDate = diff > 730;

  if (outOfDate) {
    return `<p class="post__outOfDate">⚠️ This post is over two years old and may contain some outdated technical information. Please proceed with caution!</p>`;
  }

  return "";
}

exports.render = async function (data) {
  const { post } = data;

  const openGraphImageUrl = await OpenGraph.generateImageUrl({
    title: post.title,
    topics: post.topicsCollection.items,
  });

  return /* html */ `
    <div class="post__meta">
      <p class="post__meta__topic">${post.topicsCollection.items[0].name}</p>
      ${PublishedDate({
        date: post.date,
        readingTime: post.readingTime,
        isTalk: false,
        updatedDate: post.updatedDate,
      })}
    </div>
    <h1 class="post__h1">${post.title}</h1>
    <section class="post">
      <aside class="post__aside">
        ${BlogSidebarAuthor({ author: post.author })}
        ${BlogSidebarSocialLinks()}
        <div class="post__asideStickyGroup">
          ${TableOfContents(post.body)}
          ${BlogSidebarTopics({ topics: post.topicsCollection.items })}
        </div>
      </aside>
      <article class="post__article">
        <div class="post__body">
          ${outOfDateWarning({ post })}
          ${RichText(post.body, {
            renderRssFriendlyImg: false,
            absoluteUrls: false,
            renderHeadingLinks: true,
          })}
        </div>

        ${post.isSponsored ? isSponsored() : ""}
        ${ExternalUrl({ url: post.externalUrl })}

        ${
          post.relatedPostsCollection?.items.length > 0
            ? /*html*/ `
            <div class="post__related">
              <div class="post__relatedHeader">
                <p class="post__relatedHeaderTitle">Read next 👇</p>
              </div>
              <div class="post__relatedGrid">
                ${post.relatedPostsCollection.items
                  .map((post) => Card({ item: post, showType: false }))
                  .join("")}
              </div>
            </div>`
            : ""
        }

        <div class="post__inlineAside">
          ${BlogSidebarTopics({ topics: post.topicsCollection.items })}
        </div>

        <script type="application/ld+json">${PostStructuredData({
          post,
          imageUrl: openGraphImageUrl,
        })}</script>
      </article>
    </section>
    `;
};
