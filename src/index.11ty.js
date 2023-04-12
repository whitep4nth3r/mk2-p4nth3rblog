const HomeAbout = require("./_components/homeAbout");
const OpenGraph = require("../lib/openGraph");
const TwitchInfo = require("./_components/twitchInfo");
const DiscordIcon = require("./_components/svg/discordIcon");
const RandomBlogPost = require("./_components/randomBlogPost");
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
    <div>
      <div class="home__sticky">
        ${HomeAbout({ person })}
      </div>
    </div>

    <div class="home__items">
        <div class="home__item">
          ${TwitchInfo()}
        </div>
        <div class="home__item home__item--activity">
          <a href="/activity/" class="home__itemTitle">🪴 Check out my <span class="colorHighlight">latest activity</span></a>
          ${ActivityFeedItem({ item: activityFeed[0], forceActiveState: true })}
        </div>
        <div class="home__item">
          <a href="/blog/" class="home__itemTitle">📕 Read <span class="colorHighlight">blogs and tutorials</span></a>
          ${RandomBlogPost({ post: randomBlogPost })}
        </div>
        <div class="home__item">
          <a href="/discord" class="home__itemTitle">${DiscordIcon()} Join <span class="colorHighlight">The Claw Discord server</span></a>
            <div class="homeCard">
              <div class="homeCard__excerpt">
                <p>Join a growing community of developers who are building stuff, learning things, and helping each other grow through the power of open source software.</p>
              </div>
            </div>
        </div>
      </div>
  </section>

  `;
};
