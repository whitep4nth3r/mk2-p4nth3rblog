const ExternalUrl = require("../_components/externalUrl");
const Author = require("../_components/author");
const RichText = require("../_components/richText");
const PublishedDate = require("../_components/publishedDate");
const TableOfContents = require("../_components/tableOfContents");
const isSponsored = require("../_components/isSponsored");
const Card = require("../_components/card");
const HeartIcon = require("../_components/svg/heartIcon");
const PostStructuredData = require("../_components/postStructuredData");
const OpenGraph = require("../../lib/openGraph");

var md = require("markdown-it")({
  html: true,
});

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
    title: (data) => data.post.metaTitle,
    slug: (data) => data.post.slug,
    includeInSitemap: (data) => data.post.externalUrl === null,
    canonical: (data) => data.post.externalUrl || `https://whitep4nth3r.com/blog/${data.post.slug}/`,
    metaDescription: (data) => data.post.metaDescription,
    openGraphImageUrl: (data) => OpenGraph.generateImageUrl({ title: data.post.title }),
    openGraphImageAlt: (data) => OpenGraph.generateImageAlt(data.post.title),
    openGraphImageWidth: OpenGraph.imgWidth,
    openGraphImageHeight: OpenGraph.imgHeight,
    openGraphUrl: (data) => data.post.externalUrl || `https://whitep4nth3r.com/blog/${data.post.slug}/`,
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
  const { post, newsletter } = data;

  const openGraphImageUrl = await OpenGraph.generateImageUrl({
    title: post.title,
    topics: post.topicsCollection.items,
  });

  return /*html*/ `
    <article class="post h-entry">
      <div class="post__header">
        <h1 class="post__h1 p-name" style="view-transition-name: heading-${post.sys.id}">${post.title}</h1>
        
        <div class="post__byline">
          <div class="post__meta">
            <p class="post__meta__topic p-category">${post.topicsCollection.items[0].name}</p>
            ${PublishedDate({
              date: post.date,
              readingTime: post.readingTime,
              isTalk: false,
              updatedDate: post.updatedDate,
            })}
          </div>
          <div class="post__excerpt">${md.render(post.excerpt)}</div>
        </div>
      </div>

      <aside class="post__aside">
        ${TableOfContents(post.body)}
      </aside>
     
      <aside class="post__author">
        ${Author({
          author: post.author,
          uUrl: `https://whitep4nth3r.com/blog/${data.post.slug}/`,
          hideOnSmallScreens: true,
        })}
        <div style="visibility: hidden; height: 0;">
          <a class="p-author h-card" href="https://whitep4nth3r.com/">Salma Alam-Naylor</a>
          <a class="u-url" href="${`https://whitep4nth3r.com/blog/${data.post.slug}/`}">${post.title}</a>
          <img class="u-photo" src="https://images.ctfassets.net/56dzm01z6lln/69YokY1TvGVk37gCQmQJDo/c315f0996556c9c1f276d12d5f201a76/headshot_relaxed.png"/>
        </div>
      </aside>

       ${
         post.blueskyPostId
           ? `
              <aside class="post__likes" data-bsky-container>
                <a href="https://bsky.app/profile/whitep4nth3r.com/post/${
                  post.blueskyPostId
                }" target="_blank" aria-label="Like this post on Bluesky" class="post__likesTitle">${HeartIcon()} <span data-bsky-likes-count></span> likes</a>
                <ul data-bsky-likes class="post__likesList">
                </ul>
              </aside>`
           : ""
       }

      <section class="post__article">
        <div class="post__body e-content">
          ${outOfDateWarning({ post })}
          ${RichText(post.body, {
            renderRssFriendlyImg: false,
            absoluteUrls: false,
            renderHeadingLinks: true,
          })}
        </div>

        ${post.isSponsored ? isSponsored() : ""}

        ${ExternalUrl({ url: post.externalUrl })}
      </section>
    </article>

      ${
        post.relatedPostsCollection?.items.length > 0
          ? /*html*/ `
    <div class="post__related">
      <div class="post__relatedHeader">
        <p class="post__relatedHeaderTitle">Read more on this topic</p>
      </div>
      <div class="post__relatedGrid">
        ${post.relatedPostsCollection.items
          .map((post) => Card({ item: { ...post, type: "post" }, showType: false, lazyLoad: true }))
          .join("")}
      </div>
    </div>`
          : ""
      }

    <meta data-bsky-post-id="${post.blueskyPostId}" />
    <script type="application/ld+json">${PostStructuredData({
      post,
      imageUrl: openGraphImageUrl,
    })}</script>
    <script src="/js/bsky_post_likes.js" type="module"></script>
    <script src="/js/copy_code.js"></script>
    `;
};
