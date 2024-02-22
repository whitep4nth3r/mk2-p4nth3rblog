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
  const { activityFeed, person, newsletter } = data;
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
        ${TwitchInfo()}
      </div>
      <a href="/activity/" class="home__heading">Latest news and activity</a>
      <div class="home__activity">
      <div class="card">
        <div class="card__imageContainer">
          <img src="/img/wwwh.png" class="card__image" alt="weird wide web hole" width="500" height="250" style="width: 100%;" />
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
      <!-- <h2 class="home__heading"><a href="/activity/">See more stuff</a></h2> -->
    </div>

  </section>
  `;
};
