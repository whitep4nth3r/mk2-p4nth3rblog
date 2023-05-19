const HomeAbout = require("./_components/homeAbout");
const OpenGraph = require("../lib/openGraph");
const TwitchInfo = require("./_components/twitchInfo");
const ActivityFeedItem = require("./_components/card");
const pageTitle = "Salma Alam-Naylor — live streamer, software engineer and developer educator ";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  activeNav: "home",
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
      <a href="/activity/" class="home__heading">Latest news and activity</a>
      <div class="home__activity">
      ${feedItems.map((item) => ActivityFeedItem({ item })).join("")}
      </div>
      <!-- <h2 class="home__heading"><a href="/activity/">See more stuff</a></h2> -->
    </div>

  </section>
  `;
};
