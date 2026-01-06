const Author = require("../_components/author");
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
  <article class="post">
    <div class="post__header">
      <h1 class="post__h1">${talk.title}</h1>

      <div class="post__byline">
        <div class="post__meta">
          <p class="post__meta__topic post__meta__topic--alt">talk</p>
          <p class="post__meta__topic">${talk.topicsCollection.items[0].name}</p>
            ${PublishedDate({
              date: talk.date,
              readingTime: talk.watchTime,
              isTalk: true,
              updatedDate: null,
            })}
        </div>
        <div class="post__excerpt post__excerpt--talk">
        <h2 class="post__talkAbstractHeader">Abstract</h2>
          ${RichText(talk.abstract, {
            renderRssFriendlyImg: false,
            absoluteUrls: false,
            renderHeadingLinks: true,
          })}
      </div>
      </div>
    </div>

    <aside class="post__aside">
        <details class="tableOfContents" open>
        <summary class="tableOfContents__header">Table of contents</summary>
        <ol class="tableOfContents__list">
          ${
            talk.recording !== null
              ? `<li class="tableOfContents__item">
            <a href="#recording" class="tableOfContents__itemLink">Recording</a>
          </li>`
              : ""
          }
          <li class="tableOfContents__item">
            <a href="#slides" class="tableOfContents__itemLink">Slides</a>
          </li>
          <li class="tableOfContents__item">
            <a href="#transcript" class="tableOfContents__itemLink">Transcript</a>
          </li>
        </ol>
    </details>

    </aside>

    <aside class="post__author">
       ${Author({
         author: talk.author,
       })}
        <div style="visibility: hidden; height: 0;">
          <a class="p-author h-card" href="https://whitep4nth3r.com/">Salma Alam-Naylor</a>
          <a class="u-url" href="${`https://whitep4nth3r.com/talks/${talk.slug}/`}">${talk.title}</a>
          <img class="u-photo" src="src="${talk.author.imageBio.url}" />
        </div>
    </aside>
    <section class="post__article">
      <div class="post__body">

        ${
          talk.recording !== null
            ? `<h2 class="post__h2 post__h2--topTalk" id="recording">Recording</h2>${VideoEmbed({
                embedUrl: talk.recording.embedUrl,
                title: talk.recording.title,
              })}`
            : ""
        }
        <h2 class="post__h2" id="slides">Slides</h2>
        ${SpeakerDeckLink({ speakerDeckLink: talk.speakerDeckLink })}

        <h2 class="post__h2" id="transcript">Transcript</h2>
        ${RichText(talk.transcript, {
          renderRssFriendlyImg: false,
          absoluteUrls: false,
          renderHeadingLinks: true,
        })}
      </div>
    </section>
  </article>`;
};
