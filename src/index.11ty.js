const OpenGraph = require("../lib/openGraph");
const NextTwitchStream = require("./_components/nextTwitchStream");
const TopicsButton = require("./_components/topicsButton");
const LatestBlogPost = require("./_components/latestBlogPost");
const pageTitle = "Build stuff, learn things and love what you do with whitep4nth3r";

var md = require("markdown-it")({
  html: true,
});

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription:
    "whitep4nth3r helps developers build stuff, learn things and love what they do. She currently works at Netlify, streams live coding on Twitch, and loves helping people get into tech.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imageWidth,
  openGraphImageHeight: OpenGraph.imageHeight,
};

exports.render = function (data) {
  const { twitch, latestBlogPost } = data;
  return /*html*/ `
  <section class="grid">
    <div class="grid__item">
    <h2 class="grid__itemTitle">build <span class="colorHighlight">stuff</h2>
      ${NextTwitchStream({ stream: twitch.nextStream, isLive: twitch.isLive, onVacation: twitch.onVacation })}
      <a href="/projects/">See all open source projects</a>
    </div>
  
    <div class="grid__item">
      <h2 class="grid__itemTitle">learn <span class="colorHighlight">things</h2>
      ${LatestBlogPost({ post: latestBlogPost })}
    </div>
    <div class="grid__item">
      <h2 class="grid__itemTitle">love <span class="colorHighlight">what you do</span></h2>
    </div>
  </section>
  `;
};
