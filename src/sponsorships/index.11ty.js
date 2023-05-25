const OpenGraph = require("../../lib/openGraph");
const pageTitle = "Sponsorships and collaborations";
const Testimonial = require("../_components/testimonial");
const BlogSidebarAuthor = require("../_components/blogSidebarAuthor");
const TableOfContents = require("../_components/tableOfContents");
const RichText = require("../_components/richText");

exports.data = {
  layout: "base.html",
  pageType: "sponsorships",
  eleventyComputed: {
    title: (data) => data.content.metaTitle,
    metaDescription: (data) => data.content.metaDescription,
    openGraphImageUrl: (data) => OpenGraph.generateImageUrl({ title: data.content.metaTitle }),
    openGraphImageAlt: (data) => OpenGraph.generateImageAlt(data.content.metaTitle),
  },
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/sponsorships/",
};

exports.render = function (data) {
  const { testimonials, content, person } = data;

  return /* html */ `

    <h1 class="post__h1">${content.title}</h1>
    <section class="post">
      <aside class="post__aside">
        ${BlogSidebarAuthor({ author: person })}
        <div class="post__asideStickyGroup">
          ${TableOfContents(content.body)}
        </div>
      </aside>
      <article class="post__article">
        <div class="post__body">
          ${RichText(content.body, {
            renderRssFriendlyImg: false,
            absoluteUrls: false,
            renderHeadingLinks: true,
          })}
        </div>

        <hr class="post__separator" />

        ${testimonials.map((testimonial) => Testimonial({ testimonial })).join("")}
        
    </section>
  `;
};
