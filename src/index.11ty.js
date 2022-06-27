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

    ${await this.edge(
      `{% assign clip = clips | getRandomTwitchClip %}
      <div class="home__twitchClip">
        <iframe
            src="https://clips.twitch.tv/embed?clip={{ clip.id }}&parent=localhost"
            height="100%"
            width="100%"
            allowfullscreen>
        </iframe>
      </div>`,
      "liquid",
      data.twitchClips,
    )}
    </div>

  </section>

  `;
};
