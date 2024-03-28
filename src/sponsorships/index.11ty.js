const OpenGraph = require("../../lib/openGraph");
const Testimonial = require("../_components/testimonial");
const Author = require("../_components/author");
const StreamPackage = require("../_components/streamPackage");

var md = require("markdown-it")({
  html: true,
});

exports.data = {
  layout: "base.html",
  pageType: "sponsorships",
  eleventyComputed: {
    title: (data) => data.content.metaTitle,
    metaDescription: (data) => data.content.metaDescription,
    openGraphImageUrl: (data) =>
      OpenGraph.generateImageUrl({ title: data.content.metaTitle }),
    openGraphImageAlt: (data) =>
      OpenGraph.generateImageAlt(data.content.metaTitle),
  },
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/sponsorships/",
};

exports.render = function (data) {
  const { testimonials, content, person } = data;

  return /* html */ `  
  <div class="sponsorships">
    <h1 class="sponsorships__title">${content.title}</h1>
    <section class="sponsorships__intro">
        <aside class="sponsorships__author" data-author>
        ${Author({ author: person })}
        </aside>
        <div class="sponsorships__introText" data-intro-text>
          ${md.render(content.intro)}
        </div>
    </section>

    <hr class="post__hr" />

    <section class="sponsorships__content">
      <h2>What people say</h2>
      <div class="sponsorships__testimonials">
        ${testimonials
          .map((testimonial) => Testimonial({ testimonial }))
          .join("")}
      </div>
    </section>

    <hr class="post__hr" />
  
    <section>
      <div class="sponsorships__content">
        ${md.render(content.packagesIntro)}
        ${md.render(content.streamsIntro)}
      </div>

      <div class="sponsorships__packages">
        ${content.streamPackagesCollection.items
          .map((package) => StreamPackage({ package }))
          .join("")}
      </div>

      <div class="sponsorships__content">
        ${md.render(content.technicalTutorials)}
        ${md.render(content.demoAppsAndWebsites)}
        ${md.render(content.videoContent)}
      <div>
    </section>

    <hr class="post__hr" />

    <section class="sponsorships__content">
      <h3>Contact me</h3>
      <p>Get in touch via <a href="http://twitter.com/whitep4nth3r">Twitter</a>, <a href="https://discord.gg/theclaw">Discord</a> or <a href="mailto:whitep4nth3r@gmail.com">email</a>.</p>
    <div>
  </section>
  `;
};
