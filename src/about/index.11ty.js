const RichText = require("../_components/richText");
const ResponsiveImage = require("../_components/responsiveImage");
const AboutTableOfContents = require("../_components/aboutTableOfContents");
const AboutSocialLinks = require("../_components/aboutSocialLinks");
const OpenGraph = require("../../lib/openGraph");

const pageTitle = "About whitep4nth3r — biographies, links and more.";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription:
    "whitep4nth3r helps developers build stuff, learn things and love what they do. She currently works at Netlify, streams live coding on Twitch, and loves helping people get into tech.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imageWidth,
  openGraphImageHeight: OpenGraph.imageHeight,
};

exports.render = function (data) {
  const { person } = data;
  return /* html */ `
    <section>
      <div class="about__header">
        <h1 class="about__headerTitle">love <span class="colorHighlight">what you do</span></h1>
      </div>

      <div class="about__container">

        <aside class="about__aside">
          <div class="about__asideStickyGroup">
            ${AboutTableOfContents()}
          </div>
        </aside>

        <div>
          <section class="about__content">
            <aside class="about__inlineAside">
              ${AboutTableOfContents()}
            </aside>

            <div id="about_me" class="about__me">
              <p>About me section</p>
              <p>main content here</p>
              <p>main content here</p>
              <p>main content here</p>
              <p>main content here</p>
              <p>main content here</p>
              <p>main content here</p>
              <p>main content here</p>

              ${AboutSocialLinks()}
            <div>
          </section>

          <section id="about_events" class="about__content">
            <p>events here</p>
            <p>events here</p>
            <p>events here</p>
            <p>events here</p>
            <p>events here</p>
          </section>

        </div>
      </div>
  `;
};
