const OpenGraph = require("../lib/openGraph");
const Card = require("./_components/card");
const NewsletterSignup = require("./_components/newsletterSignup");
const Webring = require("./_components/webring");
const PersonStructuredData = require("./_components/personStructuredData");
const StarIcon = require("./_components/svg/starIcon");
const HeartIcon = require("./_components/svg/heartIcon");
const pageTitle = "I make stuff on the internet.";

const isProduction = process.env.NODE_ENV === "production";

const wwwhImgAvif = isProduction ? "/.netlify/images/?url=/img/wwwh.png?w=800&fm=avif" : "/img/wwwh.png";

const wwwhImgWebp = isProduction ? "/.netlify/images/?url=/img/wwwh.png?w=800&fm=webp" : "/img/wwwh.png";

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
  const { person, newsletter, webring, home } = data;
  const { posts, stuff } = home;

  return /*html*/ `
  <section class="home">
    <div class="hero" data-hero>
      <div class="hero__cloud">
        <h2 class="hero__cloud__wd">${HeartIcon()} web developer</h2>
        <h2 class="hero__cloud__is">international<br/>speaker</h2>
        <h2 class="hero__cloud__te">tech educator</h2>
        <h2 class="hero__cloud__e">entertainer</h2>
        <h2 class="hero__cloud__han">has a newsletter</h2>
      </div>
      <div class="hero__image">
        <div class="hero__imageOverlay"></div>
        <img src="${person.imageBio.url}" class="vt__bioImage" alt="${person.imageBio.description}" height="${
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


  <section class="home__latest">
    <h2 class="home__latestHeader">Latest articles</h2>

    <ul class="home__cards">
      ${posts.map((item) => `<li>${Card({ item: item, showType: false })}</li>`).join("")}
      <li>
        <a href="/blog/">View all</a>
      </li>
    </ul>

    <h2 class="home__latestHeader">Latest stuff on the internet</h2>

    <ul class="home__cards">
      ${stuff.map((item) => `<li>${Card({ item })}</li>`).join("")}
      <li>
        <a href="/activity/">View all</a>
      </li>
    </ul>
  </section>


  <div class="home__cards">
    <div class="card">
      <div class="card__imageContainer">
        <picture>
          <source type="image/avif" srcset="${wwwhImgAvif}" />
          <source type="image/webp" srcset="${wwwhImgWebp}" />
          <img
            src="/.netlify/images/?url=/img/wwwh.png?w=450"
            alt="weird wide web hole"
            role="presentation"
            height="250"
            width="500"
            class="card__image" />
        </picture>
      </div>
      <div class="card__inner">
        ${NewsletterSignup({
          removeMargin: true,
          subscribers: newsletter.subscribers,
        })}
        <span class="card__metaLabel">Newsletter</span>
      </div>
    </div>

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
  </div>

  <script type="application/ld+json">${PersonStructuredData({
    person,
  })}</script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/ScrollTrigger.min.js"></script>
  <script src="/js/home.js" type="module"></script>
  `;
};
