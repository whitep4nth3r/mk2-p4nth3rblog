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
    <p data-success class="sponsorships__success">Thanks for your message. I'll get back to you as soon as I can! In the meantime, why not <a href="https://twitter.com/whitep4nth3r">say hi on Twitter</a>.</p>
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
        <h2 class="sponsorships__formTitle">Contact me</h2>

        <form name="show_me_the_money" method="POST" action="/sponsorships/?success=true" netlify>
          <div class="sponsorships__topRow">
            <div class="sponsorships__formRow">
              <label class="sponsorships__formLabel" for="name">Name</label>
              <input type="text" name="name" id="name" class="sponsorships__formInput sponsorships__formInput--text" autocomplete="name">
            </div>
            <div class="sponsorships__formRow">
              <label class="sponsorships__formLabel" for="email">Email</label>
              <input type="email" name="email" id="email" class="sponsorships__formInput sponsorships__formInput--text" autocomplete="email">
            </div>
          </div>
          <p class="sponsorships__question">What do you want to talk about?</p>

          <div class="sponsorships__checkboxRow">
            <input type="checkbox" name="the_cold_start" value="✔" id="cold_start" class="sponsorships__formInput--checkbox">
            <label class="sponsorships__formLabel sponsorships__formLabel--checkbox" for="cold_start">Live stream: The Cold Start</label>
          </div>
          <div class="sponsorships__checkboxRow">
            <input type="checkbox" name="guest_star" value="✔" id="guest_star" class="sponsorships__formInput--checkbox">
            <label class="sponsorships__formLabel sponsorships__formLabel--checkbox" for="guest_star">Live stream: The Guest Star</label>
          </div>
          <div class="sponsorships__checkboxRow">
            <input type="checkbox" name="tech_tutorials" value="✔" id="tech_tutorials" class="sponsorships__formInput--checkbox">
            <label class="sponsorships__formLabel sponsorships__formLabel--checkbox" for="tech_tutorials">Technical tutorials</label>
          </div>
          <div class="sponsorships__checkboxRow sponsorships__checkboxRow--last">
            <input type="checkbox" name="demos" value="✔" id="demos" class="sponsorships__formInput--checkbox ">
            <label class="sponsorships__formLabel sponsorships__formLabel--checkbox" for="demos">Demo websites and apps</label>
          </div>

          <div class="sponsorships__formRow">
            <label class="sponsorships__formLabel">Add more info, say hi, tell a joke?</label>
            <textarea name="message" rows="5" class="sponsorships__formTextArea"></textarea>
          </div>
          <button class="sponsorships__submit" type="submit">Submit</button>
      </form>
    <section>
  </div>
  `;
};
