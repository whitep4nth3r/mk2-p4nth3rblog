const HomeAbout = require("./_components/homeAbout");
const OpenGraph = require("../lib/openGraph");
const NextTwitchStream = require("./_components/nextTwitchStream");
const NextNonTwitchEvent = require("./_components/nextNonTwitchEvent");
const GetInvolvedOpenSource = require("./_components/getInvolvedOpenSource");
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

function onAir() {
  return `<span class="home__item__onAir">ON AIR</span>`;
}

function getHeading({ isLive }) {
  if (isLive) {
    return `Join <span class="colorHighlight">the stream</span>`;
  }

  return `Watch <span class="colorHighlight">live streams</span>`;
}

exports.render = function (data) {
  const { events, randomBlogPost, person, activityFeed } = data;
  const { isLive } = events;

  return /*html*/ `
  <section class="home">
    <div>
      <div class="home__sticky">
        ${HomeAbout({ person })}
      </div>
    </div>

    <div>
      <div class="home__item">
        <a href="/about/#events" class="home__itemTitle">${isLive ? onAir() : ""} <span>${getHeading({
    isLive,
  })}</span></a>
          ${
            events.next.type === "twitch"
              ? NextTwitchStream({
                  stream: events.next,
                  link: events.next.link,
                  isLive,
                })
              : NextNonTwitchEvent({ event: events.next })
          }
        </div>
        <div class="home__item home__item--activity">
          <a href="/activity/" class="home__itemTitle">Check out my <span class="colorHighlight">latest activity</span></a>
          ${ActivityFeedItem({ item: activityFeed[0], forceActiveState: true })}
        </div>
        <div class="home__item">
          <a href="/blog/" class="home__itemTitle">Read <span class="colorHighlight">blogs and tutorials</span></a>
          ${RandomBlogPost({ post: randomBlogPost })}
        </div>
        <div class="home__item">
          <h2 class="home__itemTitle">Join the <span class="colorHighlight">community</span></h2>
          ${GetInvolvedOpenSource()}
        </div>
      </div>
  </section>

  `;
};
