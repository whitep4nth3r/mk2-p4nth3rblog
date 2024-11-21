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
  includeInSitemap: true,
  eleventyComputed: {
    title: (data) => data.sponsorshipsContent.metaTitle,
    metaDescription: (data) => data.sponsorshipsContent.metaDescription,
    openGraphImageUrl: (data) => OpenGraph.generateImageUrl({ title: data.sponsorshipsContent.metaTitle }),
    openGraphImageAlt: (data) => OpenGraph.generateImageAlt(data.sponsorshipsContent.metaTitle),
  },
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/sponsorships/",
};

exports.render = function (data) {
  const { testimonials, sponsorshipsContent, person } = data;

  return /* html */ `  
  <div class="sponsorships">
    <h1 class="sponsorships__title">${sponsorshipsContent.title}</h1>
    <section class="sponsorships__intro">
        <aside class="sponsorships__author" data-author>
        ${Author({ author: person, uUrl: "https://whitep4nth3r.com/sponsorships/" })}
        </aside>
        <div class="sponsorships__introText" data-intro-text>
          ${md.render(sponsorshipsContent.intro)}
        </div>
    </section>

    <hr class="post__hr" />

    <section class="sponsorships__content">
      <h2>What people say</h2>
      <div class="sponsorships__testimonials">
        ${testimonials.map((testimonial) => Testimonial({ testimonial })).join("")}
      </div>
    </section>

    <hr class="post__hr" />
  
    <section>
      <div class="sponsorships__content">
        ${md.render(sponsorshipsContent.packagesIntro)}
        ${md.render(sponsorshipsContent.streamsIntro)}
      </div>

      <div class="sponsorships__packages">
        ${sponsorshipsContent.streamPackagesCollection.items.map((package) => StreamPackage({ package })).join("")}
      </div>

      <div class="sponsorships__content">
        ${md.render(sponsorshipsContent.technicalTutorials)}
        ${md.render(sponsorshipsContent.demoAppsAndWebsites)}
        ${md.render(sponsorshipsContent.videoContent)}
      <div>
    </section>

    <hr class="post__hr" />

    <section class="sponsorships__content">
      <h3>Contact me</h3>
      <p>Get in touch via <a href="https://bsky.app/profile/whitep4nth3r.com">Bluesky</a>, <a href="https://discord.gg/theclaw">Discord</a> or <a href="mailto:whitep4nth3r@gmail.com">email</a>.</p>
    <div>
  </section>
  `;
};
