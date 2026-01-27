const PublishedDate = require("../_components/publishedDate");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt();
const OpenGraph = require("../../lib/openGraph");

exports.data = {
  layout: "base.html",
  pageType: "email",
  pagination: {
    data: "emails",
    alias: "email",
    size: 1,
    addAllPagesToCollections: true,
  },
  permalink: (data) => {
    return `newsletter/${data.email.slug}/`;
  },
  eleventyComputed: {
    title: (data) => data.email.subject,
    slug: (data) => data.email.slug,
    includeInSitemap: true,
    sitemapChangeFreq: "weekly",
    sitemapPriority: "0.5",
    canonical: (data) => `https://whitep4nth3r.com/newsletter/${data.email.slug}/`,
    metaDescription: (data) => `to do`,
    openGraphImageUrl: (data) => OpenGraph.generateImageUrl({ title: data.email.subject }),
    openGraphImageAlt: (data) => OpenGraph.generateImageAlt(data.email.subject),
    openGraphImageWidth: OpenGraph.imgWidth,
    openGraphImageHeight: OpenGraph.imgHeight,
    openGraphUrl: (data) => `https://whitep4nth3r.com/newsletter/${data.email.slug}/`,
  },
};

exports.render = async function (data) {
  const { email } = data;
  return /*html*/ `
    <article class="post h-entry">
      <div class="post__header">
        <h1 class="post__h1 p-name" style="view-transition-name: heading-${email.id}">${email.subject}</h1>
        
        <div class="post__byline">
          <div class="post__meta">
            <p class="post__meta__topic p-category">Newsletter</p>
            ${PublishedDate({
              date: email.creationDate,
            })}
          </div>
          <div class="post__excerpt">what goes here</div>
        </div>
      </div>

      <aside class="post__aside">
      </aside>
     
      <!--
      <aside class="post__author">
      </aside> -->

      <section class="post__article">
        <div class="post__body">
          ${email.body}
        </div>
      </section>
    </article>
    `;
};
