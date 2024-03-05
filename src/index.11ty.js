const HomeAbout = require("./_components/homeAbout");
const OpenGraph = require("../lib/openGraph");
const TwitchInfo = require("./_components/twitchInfo");
const ActivityFeedItem = require("./_components/card");
const NewsletterSignup = require("./_components/newsletterSignup");
const pageTitle =
  "Salma Alam-Naylor — live streamer, software engineer and developer educator ";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  activeNav: "home",
  canonical: "https://whitep4nth3r.com/",
  metaDescription:
    "I write code for your entertainment. I stream live coding on Twitch, help developers build great websites, and love helping people get into tech.",
  openGraphImageUrl: OpenGraph.generateImageUrl({
    title: "Live streamer, software engineer and developer educator",
  }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/",
};

exports.render = function (data) {
  const { activityFeed, person, newsletter, twitch } = data;
  const feedItems = activityFeed.slice(0, 8);

  return /*html*/ `
  <section class="home">

    <div class="home__left">
      <div class="home__fixed">
        ${HomeAbout({ bio: person.bioShort })}
      </div>
    </div>

    <div class="home__scroll">
      <div class="home__twitch">
        ${TwitchInfo({ isLive: twitch.isLive, vodData: twitch.vodData })}
      </div>
      <a href="/activity/" class="home__heading">Latest news and activity</a>
      <div class="home__activity">
      <div class="card">
        <div class="card__imageContainer">
          <picture>
            <source type="image/avif" srcset="/.netlify/images/?url=/img/wwwh.png?w=450&fm=avif" />
            <source type="image/webp" srcset="/.netlify/images/?url=/img/wwwh.png?w=450&fm=webp" />
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
        <div class="card__inner">
          <script
          src="https://the-claw-webring-widget.netlify.app/the-claw-webring-widget.mjs"
          type="module"
        ></script>

        <the-claw-webring-widget fullWidth="true" hideMembers="true"></the-claw-webring-widget>
          <span class="card__metaLabel">Webring</span>
        </div>
      </div>
      ${feedItems.map((item) => ActivityFeedItem({ item })).join("")}
      </div>
    </div>
  </section>
  `;
};
