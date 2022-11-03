const HomeAbout = require("./_components/homeAbout");
const OpenGraph = require("../lib/openGraph");
const NextTwitchStream = require("./_components/nextTwitchStream");
const NextNonTwitchEvent = require("./_components/nextNonTwitchEvent");
const GetInvolvedOpenSource = require("./_components/getInvolvedOpenSource");
const LatestBlogPost = require("./_components/latestBlogPost");
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
  const { events, latestPost, person, activityFeed } = data;

  return /*html*/ `
  <section class="home">
    <div>
      <div class="home__sticky">
        ${HomeAbout({ person })}
      </div>
    </div>

    <div>
      <div class="home__item">
        <h2 class="home__itemTitle">Watch <span class="colorHighlight">live streams</span></h2>
          ${
            events.next.type === "twitch"
              ? NextTwitchStream({
                  stream: events.next,
                  link: events.next.link,
                  isLive: events.isLive,
                })
              : NextNonTwitchEvent({ event: events.next })
          }
        </div>
        <div class="home__item">
          <h2 class="home__itemTitle">Latest <span class="colorHighlight">activity</span></h2>
          ${ActivityFeedItem({ item: activityFeed[0] })}
        </div>
        <div class="home__item">
          <h2 class="home__itemTitle">Read <span class="colorHighlight">blogs and tutorials</span></h2>
          ${LatestBlogPost({ post: latestPost.post })}
        </div>
        <div class="home__item">
          <h2 class="home__itemTitle">Join the <span class="colorHighlight">community</span></h2>
          ${GetInvolvedOpenSource()}
        </div>
      </div>
  </section>

  `;
};
