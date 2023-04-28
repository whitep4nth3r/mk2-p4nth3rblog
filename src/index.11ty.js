const HomeAbout = require("./_components/homeAbout");
const OpenGraph = require("../lib/openGraph");
const TwitchInfo = require("./_components/twitchInfo");
const ActivityFeedItem = require("./_components/card");
const pageTitle = "Salma Alam-Naylor — live streamer, software engineer and writer ";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  activeNav: "home",
  metaDescription:
    "I write code for your entertainment. I work at Netlify, stream coding on Twitch, and love helping people get into tech.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/",
};

exports.render = function (data) {
  const { activityFeed, person } = data;
  const feedItems = activityFeed.slice(0, 10);

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
      <h2 class="home__heading">Check out my latest activity</h2>
      <div class="home__activity">
      ${feedItems.map((item) => ActivityFeedItem({ item })).join("")}
      </div>
      <!-- <h2 class="home__heading"><a href="/activity/">See more stuff</a></h2> -->
    </div>

  </section>
  `;
};
