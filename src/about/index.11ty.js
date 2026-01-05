const RichText = require("../_components/richText");
const TabbedBio = require("../_components/tabbedBio");
const OpenGraph = require("../../lib/openGraph");
const PersonStructuredData = require("../_components/personStructuredData");
const StarIcon = require("../_components/svg/starIcon");

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
    "Salma writes code for your entertainment. She's a software engineer and developer educator, and helps developers build cool stuff on the web.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/about/",
  includeInSitemap: true,
};

exports.render = function (data) {
  const { person } = data;

  return /* html */ `
    <section class="about">
      <div class="about__hero" data-hero>
        <h1 class="about__name">
          <span class="about__name__inner">
            <span class="hero__name__separator">${StarIcon()}</span>
            <span>SALMA ALAM-NAYLOR</span>
            <span class="hero__name__separator">${StarIcon()}</span>
          <span>
        </h1>

        <div class="about__hero__image">
         <img src="${person.imageBio.url + `?fm=webp`}" alt="${person.imageBio.description}" height="${
    person.imageBio.height
  }" width="${person.imageBio.width}" />
        </div>

        <div class="about__hero__bio">
          ${TabbedBio({
            shortBio: md.render(person.bioShort),
            speakerBio: md.render(person.bioSpeaker),
            longBio: RichText(person.bioLong),
          })}
        </div>
      </div>
    </section>

    <!--
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/ScrollTrigger.min.js"></script>
    <script src="/js/about.js" type="module"></script> -->
    <script type="application/ld+json">${PersonStructuredData({
      person,
    })}</script>
  `;
};
