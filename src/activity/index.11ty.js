const OpenGraph = require("../../lib/openGraph");
const pageTitle = "My activity feed";
const VideoEmbed = require("../_components/videoEmbed");
const TweetEmbed = require("../_components/tweetEmbed");
const ActivityFeedItem = require("../_components/activityFeedItem");

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
            case "youtube":
              return VideoEmbed({ embedUrl: item.videoEmbed.embedUrl, title: item.videoEmbed.title });
            case "tweet":
              return TweetEmbed({ tweetUrl: item.tweetEmbed.tweetUrl });
            default:
              return ActivityFeedItem({
                title: item.title || item.name,
                date: item.date,
                description: item.description,
                image: item.image,
                link: item.link,
                type: item.type,
              });
          }
        })
        .join("")}
    </div>
  </section>`;
};
