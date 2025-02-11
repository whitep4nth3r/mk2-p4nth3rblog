const ExternalUrl = require("../_components/externalUrl");
const Author = require("../_components/author");
const BlogEndAuthor = require("../_components/blogEndAuthor");
const NewsletterSignup = require("../_components/newsletterSignup");
const RichText = require("../_components/richText");
const PublishedDate = require("../_components/publishedDate");
const TableOfContents = require("../_components/tableOfContents");
const isSponsored = require("../_components/isSponsored");
const Card = require("../_components/card");
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
    <article class="h-entry">
      <div class="post__meta">
        <p class="post__meta__topic p-category">${post.topicsCollection.items[0].name}</p>
        ${PublishedDate({
          date: post.date,
          readingTime: post.readingTime,
          isTalk: false,
          updatedDate: post.updatedDate,
        })}
      </div>
      <h1 class="post__h1 p-name">${post.title}</h1>
      <section class="post">
        <aside class="post__aside">
          <div class="post__authorContainer">
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
          </div>
          <div class="post__asideStickyGroup">
            <span class="post__newsletterSignupWide">${NewsletterSignup({
              removeMargin: false,
              subscribers: newsletter.subscribers,
            })}</span>
            ${TableOfContents(post.body)}
          </div>
        </aside>
        <div class="post__article">
          <div class="post__excerpt">${md.render(post.excerpt)}</div>
          <hr class="post__separator" aria-hidden="true" />
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

            ${
              post.blueskyPostId
                ? `
              <section class="post__likes" data-bsky-container>
                <h3 class="post__likesTitle">🦋 <span data-bsky-likes-count></span> likes on Bluesky</h3>
                <a class="post__likesCta" href="https://bsky.app/profile/whitep4nth3r.com/post/${post.blueskyPostId}" target="_blank">Like this post on Bluesky to see your face on this page</a>
                <ul data-bsky-likes class="post__likesList"></ul>
              </section>`
                : ""
            }

          <span class="post__newsletterSignupSmall">${NewsletterSignup({
            removeMargin: false,
            subscribers: newsletter.subscribers,
          })}</span>

          <hr class="post__separator" />

          ${BlogEndAuthor({
            author: post.author,
            uUrl: `https://whitep4nth3r.com/blog/${data.post.slug}/`,
          })}

          <div class="post__coffee">
            <h3 class="post__coffeeHeader">Did this post help you?</h3>
            <a href="https://www.buymeacoffee.com/whitep4nth3r" class="post__coffeeButton" target="_blank">☕️ Buy me a coffee</a>
            <p class="post__coffeeThanks">(thank you!)</p>
          </div>

          ${
            post.relatedPostsCollection?.items.length > 0
              ? /*html*/ `
              <div class="post__related">
                <div class="post__relatedHeader">
                  <p class="post__relatedHeaderTitle">Related posts</p>
                </div>
                <div class="post__relatedGrid">
                  ${post.relatedPostsCollection.items
                    .map((post) => Card({ item: { ...post, type: "post" }, showType: false, lazyLoad: true }))
                    .join("")}
                </div>
              </div>`
              : ""
          }

          <script type="application/ld+json">${PostStructuredData({
            post,
            imageUrl: openGraphImageUrl,
          })}</script>
        </div>
      </article>
    </section>
    <meta data-bsky-post-id="${post.blueskyPostId}" />
    <script src="/js/bsky_post_likes.js" type="module"></script>
    <script src="/js/copy_code.js"></script>
    `;
};
