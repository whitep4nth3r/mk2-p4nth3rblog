const RichText = require("../_components/richText");
const BioImage = require("../_components/bioImage");
const TabbedBio = require("../_components/tabbedBio");
const OpenGraph = require("../../lib/openGraph");
const NameLogo = require("../_components/svg/nameLogo");

const pageTitle = "About Salma Alam-Naylor";

var md = require("markdown-it")({
  html: true,
});

exports.data = {
  layout: "base.html",
  title: pageTitle,
  activeNav: "about",
  pageType: "about",
  metaDescription:
    "Salma writes code for your entertainment. She's a live streamer, software engineer, and developer educator, and helps developers build cool stuff with blog posts, tutorial videos, live coding and open source projects.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/about/",
};

exports.render = function (data) {
  const { person } = data;

  return /* html */ `
    <div class="about">
      <div class="about__image">
        <div class="about__fixed">
          ${BioImage({ image: person.imageBio })}
        </div>
      </div>

      <div class="about__details">
        <div class="about__name">
          <h1 class="transition__logo">
            ${NameLogo()}
          </h1>
        </div>
        <div class="about__bio">
          ${TabbedBio({
            shortBio: md.render(person.bioShort),
            speakerBio: md.render(person.bioSpeaker),
            longBio: RichText(person.bioLong),
          })}
        </div>
      </div>
    </div>
  `;
};
