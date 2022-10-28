const HomeAbout = require("./_components/homeAbout");
const OpenGraph = require("../lib/openGraph");
const NextTwitchStream = require("./_components/nextTwitchStream");
const NextNonTwitchEvent = require("./_components/nextNonTwitchEvent");
const GetInvolvedOpenSource = require("./_components/getInvolvedOpenSource");
const LatestBlogPost = require("./_components/latestBlogPost");
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
  const { events, latestPost, person } = data;

  return /*html*/ `
  <section class="home">
    <div class="home__sticky">
      ${HomeAbout({ person })}
    </div>
    <div>
      <div class="home__item">
      <h2 class="home__itemTitle">build <span class="colorHighlight">stuff</span></h2>
        ${GetInvolvedOpenSource()}
      </div>
      <div class="home__item">
        <h2 class="home__itemTitle">learn <span class="colorHighlight">things</span></h2>
        ${LatestBlogPost({ post: latestPost.post })}
      </div>
      <div class="home__item">
        <h2 class="home__itemTitle">love <span class="colorHighlight">what you do</span></h2>
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
    </div>
  </section>

  `;
};
