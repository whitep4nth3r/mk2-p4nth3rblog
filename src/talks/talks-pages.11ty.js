const Topics = require("../_components/topics");
const RichText = require("../_components/richText");
const VideoEmbed = require("../_components/videoEmbed");
const SpeakerDeckLink = require("../_components/speakerDeckLink");
const PublishedDate = require("../_components/publishedDate");
const OpenGraph = require("../../lib/openGraph");

exports.data = {
  layout: "base.html",
  pagination: {
    data: "talks",
    alias: "talk",
    size: 1,
  },
  permalink: (data) => {
    return `talks/${data.talk.slug}/`;
  },
  eleventyComputed: {
    title: (data) => data.talk.title,
    metaDescription: (data) => data.talk.excerpt,
    openGraphImageUrl: (data) =>
      OpenGraph.generateImageUrl({ title: data.talk.title, topics: data.talk.topicsCollection.items }),
    openGraphImageAlt: (data) => OpenGraph.generateImageAlt(data.talk.title),
    openGraphImageWidth: OpenGraph.imageWidth,
    openGraphImageHeight: OpenGraph.imageHeight,
  },
};

exports.render = function (data) {
  const { talk } = data;
  return /* html */ `<div>
    ${Topics({ topics: talk.topicsCollection.items })}
    

    <h1>${talk.title}</h1>

    ${PublishedDate({ date: talk.date, readingTime: talk.watchTime, isTalk: true, updatedDate: talk.updatedDate })}

    <h2>Slides</h2>
    ${SpeakerDeckLink({ speakerDeckLink: talk.speakerDeckLink })}
    <h2>Recording</h2>
    ${VideoEmbed({ embedUrl: talk.recording.embedUrl, title: talk.recording.title })}
    <h2>Abstract</h2>
    <h2>Transcript</h2>
    ${RichText(talk.transcript)}
  </div>`;
};
