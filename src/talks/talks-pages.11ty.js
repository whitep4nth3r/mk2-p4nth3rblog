const Author = require("../_components/author");
const BlogEndAuthor = require("../_components/blogEndAuthor");
const RichText = require("../_components/richText");
const VideoEmbed = require("../_components/videoEmbed");
const SpeakerDeckLink = require("../_components/speakerDeckLink");
const PublishedDate = require("../_components/publishedDate");
const OpenGraph = require("../../lib/openGraph");

exports.data = {
  layout: "base.html",
  pageType: "talk",
  pagination: {
    data: "talks",
    alias: "talk",
    size: 1,
    addAllPagesToCollections: true,
  },
  permalink: (data) => {
    return `talks/${data.talk.slug}/`;
  },
  includeInSitemap: true,
  eleventyComputed: {
    title: (data) => data.talk.title,
    metaDescription: (data) => data.talk.metaDescription,
    openGraphImageUrl: (data) =>
      OpenGraph.generateImageUrl({
        title: data.talk.title,
      }),
    openGraphImageAlt: (data) => OpenGraph.generateImageAlt(data.talk.title),
    openGraphImageWidth: OpenGraph.imgWidth,
    openGraphImageHeight: OpenGraph.imgHeight,
    openGraphUrl: (data) => `https://whitep4nth3r.com/talks/${data.talk.slug}/`,
  },
};

exports.render = function (data) {
  const { talk } = data;

  return /* html */ `
  <div class="post__meta">
    <p class="post__meta__topic">${talk.topicsCollection.items[0].name}</p>
      ${PublishedDate({
        date: talk.date,
        readingTime: talk.watchTime,
        isTalk: true,
        updatedDate: null,
      })}
    </div>
  <h1 class="post__h1">${talk.title}</h1>
  <section class="post">
    <aside class="post__aside">
      <div class="post__authorContainer">
        ${Author({
          author: talk.author,
          uUrl: `https://whitep4nth3r.com/talks/${data.talk.slug}/`,
          hideOnSmallScreens: true,
        })}
      </div>
    </aside>
    <article class="post__article">
      <div class="post__excerpt">
        ${RichText(talk.abstract, {
          renderRssFriendlyImg: false,
          absoluteUrls: false,
          renderHeadingLinks: true,
        })}
      </div>
      <hr class="post__separator" />

      <div class="post__body">
        ${talk.recording !== null ? VideoEmbed({ embedUrl: talk.recording.embedUrl}) : ""}
        <h2 class="post__h2">Slides</h2>
        ${SpeakerDeckLink({ speakerDeckLink: talk.speakerDeckLink })}

        <h2 class="post__h2">Transcript</h2>
        ${RichText(talk.transcript, {
          renderRssFriendlyImg: false,
          absoluteUrls: false,
          renderHeadingLinks: true,
        })}
        </div>
        
        <hr class="post__separator" />

        ${BlogEndAuthor({ author: talk.author, uUrl: `https://whitep4nth3r.com/talks/${data.talk.slug}/` })}
      </article>
  </section>`;
};
