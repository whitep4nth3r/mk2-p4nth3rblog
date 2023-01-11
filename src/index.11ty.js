const HomeAbout = require("./_components/homeAbout");
const OpenGraph = require("../lib/openGraph");
const TwitchInfo = require("./_components/twitchInfo");
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
          ${TwitchInfo()}
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
        <script src="https://the-claw-webring-widget.netlify.app/the-claw-webring-widget.mjs" type="module"></script>
        <the-claw-webring-widget>
          <!-- fallback content in the case of no JavaScript -->
          <div style="color: inherit; font-family: system-ui; padding: 1rem; font-size: 1rem;">
            <div style="display: grid; gap: 0.5rem 1rem; align-items: center; margin-bottom: 1rem; justify-content: flex-start; grid-template-areas: 'image title' 'image view';">
              <img
                src="https://the-claw-webring.netlify.app/img/theclaw.png"
                alt="The Claw Webring"
                style="grid-area: image; height: 4rem; transform: rotate(-8deg);"
              />
              <h2 style="grid-area: title; font-size: 1.4rem; margin: 0;">The Claw Webring</h2>
              <a href="https://github.com/whitep4nth3r/the-claw-webring" style="grid-area: view; margin: 0; color: inherit;">View on GitHub</a>
            </div>
          </div>
        </the-claw-webring-widget>
      </div>
  </section>

  `;
};
