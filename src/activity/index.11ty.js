const OpenGraph = require("../../lib/openGraph");
const pageTitle = "My activity feed";
const VideoEmbed = require("../_components/videoEmbed");

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription: `TO DO`,
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/activity/",
};

exports.render = function (data) {
  const { postSummaries, talkSummaries, activityFeedItems } = data;

  const orderByDate = (a, b) => {
    if (a.date < b.date) {
      return 1;
    }

    return -1;
  };

  const activityFeed = [...postSummaries, ...talkSummaries, ...activityFeedItems].sort(orderByDate);

  return /* html */ `
  
  <section>
    <div>
      ${activityFeed
        .map((item) => {
          switch (item.type) {
            case "podcast":
              return `<p>${item.title}</p><img src="${item.image.url}" alt="${item.image.description}" />`;
            case "award":
              return `<p>${item.title}</p><img src="${item.image.url}" alt="${item.image.description}" />`;
            case "link":
              return `<p>${item.title}</p>`;
            case "youtube":
              return VideoEmbed({ embedUrl: item.videoEmbed.embedUrl, title: item.videoEmbed.title });
            case "event":
              return `<p>${item.name}</p>`;
            case "postSummary":
              return `<p>${item.title}</p>`;
            case "talkSummary":
              return `<p>${item.title}</p>`;
            default:
              return "";
          }
        })
        .join("")}
    </div>
  </section>`;
};
