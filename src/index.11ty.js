const OpenGraph = require("../lib/openGraph");
const NextTwitchStream = require("./_components/nextTwitchStream");
const TopicsButton = require("./_components/topicsButton");
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
  return /* html */ `
  <section>
    <h2>build stuff</h2>
    ${NextTwitchStream({ stream: twitch.nextStream, isLive: twitch.isLive, onVacation: twitch.onVacation })}

    <a href="/projects/">See all open source projects</a>
  </section>

  <section>
    <h2>learn things</h2>

    <a href="/blog/${latestBlogPost.slug}">
      <h3>${latestBlogPost.title}</h3>
      <p>${md.render(latestBlogPost.excerpt)}</p>
    </a>

    ${TopicsButton({ topics: latestBlogPost.topicsCollection.items })}

    <a href="/blog/">See all blog articles</a>
  </section>

  <section>
    <h2>love what you do</h2>
  </section>
  `;
};
