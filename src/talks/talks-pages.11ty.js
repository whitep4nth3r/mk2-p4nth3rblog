const BlogSidebarAuthor = require("../_components/blogSidebarAuthor");
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
  eleventyComputed: {
    title: (data) => `${data.talk.title} - Salma Alam-Naylor`,
    metaDescription: (data) => data.talk.metaDescription,
    openGraphImageUrl: (data) =>
      OpenGraph.generateImageUrl({
        title: data.talk.title,
        topics: data.talk.topicsCollection.items,
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
      ${BlogSidebarAuthor({ author: talk.author })}
    </aside>
    <article class="post__article">
      <div class="post__excerpt">
        ${RichText(talk.abstract, {
          renderRssFriendlyImg: false,
          absoluteUrls: false,
          renderHeadingLinks: true,
        })}
      </div>
      <hr class="post__excerpt__separator" aria-hidden="true" />
      <div class="post__body">
        ${
          talk.recording !== null
            ? VideoEmbed({ embedUrl: talk.recording.embedUrl, title: talk.recording.title })
            : ""
        }
        <h2 class="post__h2">Slides</h2>
        ${SpeakerDeckLink({ speakerDeckLink: talk.speakerDeckLink })}

        <h2 class="post__h2">Transcript</h2>
        ${RichText(talk.transcript, {
          renderRssFriendlyImg: false,
          absoluteUrls: false,
          renderHeadingLinks: true,
        })}
        </div>
      </article>
  </section>`;
};
