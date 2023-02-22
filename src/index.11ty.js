const HomeAbout = require("./_components/homeAbout");
const OpenGraph = require("../lib/openGraph");
const TwitchInfo = require("./_components/twitchInfo");
const DiscordIcon = require("./_components/svg/discordIcon");
const ActivityFeedItem = require("./_components/activityFeedItem");
const pageTitle = "Tech streams, blogs and code tutorials";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription:
    "I write code for your entertainment. I work at Netlify, stream coding on Twitch, and love helping people get into tech.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/",
};

exports.render = function (data) {
  const { events, randomBlogPost, person, activityFeed } = data;
  return /*html*/ `
  <section class="home">

    <div class="home__left">
      <div class="home__fixed">
        ${HomeAbout()}
      </div>
    </div>

    <div class="home__scroll">
      <div class="home__twitch">
        ${TwitchInfo()}
      </div>

    </div>

  </section>
  `;
};
