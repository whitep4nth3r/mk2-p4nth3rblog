const RichText = require("../_components/richText");
const BioImage = require("../_components/bioImage");
const AboutSocialLinks = require("../_components/aboutSocialLinks");
const TwitchIcon = require("../_components/svg/twitchIcon");
const TabbedBio = require("../_components/tabbedBio");
const YoutubeIcon = require("../_components/svg/youtubeColor");
const OpenGraph = require("../../lib/openGraph");

const pageTitle = "About Salma Alam-Naylor";

var md = require("markdown-it")({
  html: true,
});

exports.data = {
  layout: "base.html",
  title: pageTitle,
  activeNav: "about",
  metaDescription:
    "Salma writes code for your entertainment. She's a software engineer, writer, and live streamer,  helping developers build cool stuff with blog posts, tutorial videos, live coding and open source projects. She works at Netlify.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/about/",
};

exports.render = function (data) {
  const { person } = data;

  return /* html */ `
    <div class="page__index">
      <div class="page__header">
        <h1 class="page__headerTitle">About Salma Alam-Naylor</h1>
      </div>

      <div class="about">
        <div>
          <div class="about__meFace">
            ${BioImage({ image: person.imageBio })}
          </div>
          <div class="about__meLinks">
            <p>these should not be buttons 🔽</p>
            ${AboutSocialLinks()}
          </div>
        </div>

        <div>
          ${TabbedBio({
            shortBio: md.render(person.bioShort),
            speakerBio: md.render(person.bioSpeaker),
            longBio: RichText(person.bioLong),
          })}
        </div>
      </div>
  `;
};
