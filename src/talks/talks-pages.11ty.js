const BlogSidebarAuthor = require("../_components/blogSidebarAuthor");
const BlogSidebarTopics = require("../_components/blogSidebarTopics");
const RichText = require("../_components/richText");
const VideoEmbed = require("../_components/videoEmbed");
const SpeakerDeckLink = require("../_components/speakerDeckLink");
const PublishedDate = require("../_components/publishedDate");
const SeeAllCta = require("../_components/seeAllCta");
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
    title: (data) => data.talk.title,
    metaDescription: (data) => data.talk.metaDescription,
    openGraphImageUrl: (data) =>
      OpenGraph.generateImageUrl({ title: data.talk.title, topics: data.talk.topicsCollection.items }),
    openGraphImageAlt: (data) => OpenGraph.generateImageAlt(data.talk.title),
    openGraphImageWidth: OpenGraph.imgWidth,
    openGraphImageHeight: OpenGraph.imgHeight,
    openGraphUrl: (data) => `https://whitep4nth3r.com/talks/${data.talk.slug}/`,
  },
};

exports.render = function (data) {
  const { talk } = data;
  return /* html */ `
  
  <section class="post">
      <aside class="post__aside">
        ${BlogSidebarAuthor({ author: talk.author })}

        ${PublishedDate({
          date: talk.date,
          readingTime: talk.watchTime,
          isTalk: true,
          updatedDate: null,
        })}

        ${BlogSidebarTopics({ topics: talk.topicsCollection.items })}

        ${SeeAllCta({ things: "talks", url: "/talks/" })}

      </aside>

      <article class="post__article">
         <h1 class="post__h1">${talk.title}</h1>

         <aside class="post__inlineAside">
           ${BlogSidebarAuthor({ author: talk.author })}
           ${PublishedDate({
             date: talk.date,
             readingTime: talk.watchTime,
             isTalk: true,
             updatedDate: null,
           })}
        </aside>

        <div class="post__body">

          ${RichText(talk.abstract, { renderRssFriendlyImg: false, absoluteUrls: false, renderHeadingLinks: true })}

          ${VideoEmbed({ embedUrl: talk.recording.embedUrl, title: talk.recording.title })}

          <h2 class="post__h2">Slides</h2>
          ${SpeakerDeckLink({ speakerDeckLink: talk.speakerDeckLink })}

          <h2 class="post__h2">Transcript</h2>
          ${RichText(talk.transcript, { renderRssFriendlyImg: false, absoluteUrls: false, renderHeadingLinks: true })}
        </div>
      </article>
  </section>`;
};
