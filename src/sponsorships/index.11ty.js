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

    <section class="sponsorships__testimonials">
      ${testimonials.map((testimonial) => Testimonial({ testimonial })).join("")}
    </section>

    <section class="sponsorships__form">
        <h2 class="sponsorships__formTitle">Get in touch, let's talk!</h2>

        <form name="show_me_the_money" method="POST" netlify>
          <div class="sponsorships__formRow">
            <label class="sponsorships__formLabel" for="name">Name</label>
            <input type="text" name="name" id="name" class="sponsorships__formInput sponsorships__formInput--text">
          </div>
          <div class="sponsorships__formRow">
            <label class="sponsorships__formLabel" for="email">Email</label>
            <input type="email" name="email" id="email" class="sponsorships__formInput sponsorships__formInput--text">
          </div>
          <p class="sponsorships__question">What do you want to talk about?</p>

          <div class="sponsorships__checkboxRow">
            <input type="checkbox" value="the_cold_start" id="cold_start" class="sponsorships__formInput sponsorships__formInput--checkbox">
            <label class="sponsorships__formLabel" for="cold_start">Live stream: The Cold Start</label>
          </div>
          <div class="sponsorships__checkboxRow">
            <input type="checkbox" value="guest_star" id="guest_star" class="sponsorships__formInput sponsorships__formInput--checkbox">
            <label class="sponsorships__formLabel" for="guest_star">Live stream: The Guest Star</label>
          </div>
          <div class="sponsorships__checkboxRow">
            <input type="checkbox" value="tech_tutorials" id="tech_tutorials" class="sponsorships__formInput sponsorships__formInput--checkbox">
            <label class="sponsorships__formLabel" for="tech_tutorials">Technical tutorials</label>
          </div>
          <div class="sponsorships__checkboxRow">
            <input type="checkbox" value="demos" id="demos" class="sponsorships__formInput sponsorships__formInput--checkbox">
            <label class="sponsorships__formLabel" for="demos">Demo websites and apps</label>
          </div>

          <div class="sponsorships__formRow">
            <label class="sponsorships__formLabel">Add more info, say hi, tell a joke?</label>
            <textarea name="message" rows="5" class="sponsorships__formTextArea"></textarea>
          </div>
          
          <button type="submit">Submit</button>

      </form>
    <section>
  </div>
  `;
};
