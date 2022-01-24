const Topics = require("../components/topics");
const RichText = require("../components/richText");
const VideoEmbed = require("../components/videoEmbed");
const SpeakerDeckLink = require("../components/speakerDeckLink");
const PublishedDate = require("../components/publishedDate");

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
  },
};

exports.render = function (data) {
  const { talk } = data;
  return `<div>
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
