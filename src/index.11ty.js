const OpenGraph = require("../lib/openGraph");
const NextTwitchStream = require("./_components/nextTwitchStream");
const NextNonTwitchEvent = require("./_components/nextNonTwitchEvent");
const GetInvolvedOpenSource = require("./_components/getInvolvedOpenSource");
const LatestBlogPost = require("./_components/latestBlogPost");
const pageTitle = "Learn web dev, JavaScript and Jamstack from whitep4nth3r";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription:
    "Salma helps developers build stuff, learn things and love what they do. She works at Netlify, streams coding on Twitch, and loves helping people get into tech.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/",
};

exports.render = async function (data) {
  const { events, latestPost, twitchClips } = data;

  return /*html*/ `
  <section class="home">
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
                isLive: events.next.isLive,
              })
            : NextNonTwitchEvent({ event: events.next })
        }
    </div>

    <!-- we have global data — twitchClips -->
    <!-- we want to get a random one -->
    <!-- do we need to be able to do this in eleventy-edge.js? -->

    <!-- short codes from the eleventy config do not work on the edge -->
    <!-- cannot use JS here right now to get random at request time -->
    ${await this.edge(`random twitch clip {{ clips[0].id }}`, "js", data.twitchClips)}

  </section>

  `;
};
