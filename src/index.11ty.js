const OpenGraph = require("../lib/openGraph");
const Card = require("./_components/card");
const Webring = require("./_components/webring");
const PersonStructuredData = require("./_components/personStructuredData");
const StarIcon = require("./_components/svg/starIcon");
const HeartIcon = require("./_components/svg/heartIcon");
const ResponsiveImage = require("./_components/responsiveImage");
const pageTitle = "I make stuff on the internet.";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  activeNav: "home",
  canonical: "https://whitep4nth3r.com/",
  metaDescription:
    "I write code for your entertainment. I make stuff on the internet, help developers build great websites, and love helping people get into tech.",
  openGraphImageUrl: OpenGraph.generateImageUrl({
    title: "I write code for your entertainment",
  }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/",
  includeInSitemap: true,
};

exports.render = function (data) {
  const { person, webring, home } = data;
  const { posts, stuff } = home;

  return /*html*/ `
  <section class="home">
    <div class="hero" data-hero>
      <div class="hero__cloud" data-cloud>
        <span class="hero__cloud__wd"> 
          <h2>${HeartIcon()} web developer</h2>
        </span>
        <span class="hero__cloud__is">
          <h2>international speaker</h2>
        </span>
        <span class="hero__cloud__te">
          <h2>tech educator</h2>
        </span>
        <span class="hero__cloud__e">
          <h2>entertainer</h2>
        </span>
        <span class="hero__cloud__han">
          <h2 >has a <span>weird</span> newsletter</h2>
        </span>
        <span class="hero__cloud__ms">
          <h2>makes <span>stuff</span> on the internet</h2>
        </span>
      </div>
      <div class="hero__image">
        <img src="${person.imageBio.url + `?fm=webp`}" alt="${person.imageBio.description}" height="${
    person.imageBio.height
  }" width="${person.imageBio.width}" />
      </div>
      <h1 class="hero__name">
        <span class="hero__name__inner">
          <span class="hero__name__separator">${StarIcon()}</span>
          <span>SALMA ALAM-NAYLOR</span>
          <span class="hero__name__separator">${StarIcon()}</span>
        <span>
      </h1>
    </div>
  </section>

  <h2 class="home__jobTitle">Head of Developer Education @ <a href="https://nordcraft.com/" target="_blank">Nordcraft</a></h2>

  <section class="home__latest">
    <h2 class="home__latestHeader">Latest articles</h2>

    <ol class="home__cards">
      ${posts.map((item) => `<li>${Card({ item: item, showType: false })}</li>`).join("")}
      <li>
        <a href="/blog/" class="card card--viewAll"><p>Browse more articles</p></a>
      </li>
    </ol>

    <h2 class="home__latestHeader">Latest stuff on the internet</h2>

    <ol class="home__cards">
      ${stuff.map((item) => `<li>${Card({ item })}</li>`).join("")}
      <li>
        <a href="/activity/" class="card card--viewAll"><p>See more stuff</p></a>
      </li>
    </ol>
  </section>

<!--
  <div class="home__cards">
    <div class="card">
      <div class="card__imageContainer">
        <img src="/img/theclaw_webring_logo.svg" class="card__image tcwr__logo" alt="The panther moth with a tattoo style banner that reads The Claw" />
      </div>
      <div class="card__inner">
        ${Webring({
          members: webring.members,
          prevUrl: webring.prevUrl,
          nextUrl: webring.nextUrl,
        })}
        <span class="card__metaLabel">Webring</span>
      </div>
    </div>
  </div>-->

  <script type="application/ld+json">${PersonStructuredData({
    person,
  })}</script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/ScrollTrigger.min.js"></script>
  <script src="/js/home.js" type="module"></script>
  `;
};
