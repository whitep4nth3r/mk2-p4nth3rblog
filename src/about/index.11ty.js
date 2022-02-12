const RichText = require("../_components/richText");
const BioImage = require("../_components/bioImage");
const AboutTableOfContents = require("../_components/aboutTableOfContents");
const AboutSocialLinks = require("../_components/aboutSocialLinks");
const TabbedBio = require("../_components/tabbedBio");
const OpenGraph = require("../../lib/openGraph");

const pageTitle = "About whitep4nth3r — biographies, links and more.";

var md = require("markdown-it")({
  html: true,
});

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
      <div class="twoColumnWide__header">
        <h1 class="twoColumnWide__headerTitle">love <span class="colorHighlight">what you do</span></h1>
      </div>

      <div class="twoColumnWide__container">

        <aside class="twoColumnWide__aside">
          <div class="twoColumnWide__asideStickyGroup">
            ${AboutTableOfContents()}
          </div>
        </aside>

        <div class="twoColumnWide__content">

          <section>
            <aside class="twoColumnWide__inlineAside">
              ${AboutTableOfContents()}
            </aside>

            <div id="about_me" class="about__me">

              <div class="about__meFace">
                ${BioImage({ image: person.imageBio })}
              </div>

              <div class="about__meBio">
                ${TabbedBio({
                  shortBio: md.render(person.bioShort),
                  speakerBio: md.render(person.bioSpeaker),
                  longBio: RichText(person.bioLong),
                })}
              </div>

              <div>
          </section>
          
          <section>
            ${AboutSocialLinks()}
          </section>

          <section id="events" class="about__events">
            <div class="about__eventsHeader">
              <h2 class="about__eventsHeaderTitle">events <span class="colorHighlight">and talks</span></h2>
            </div>
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
