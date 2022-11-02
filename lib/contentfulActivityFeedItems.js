const ContentfulApi = require("./contentfulApi.js");
const GraphQLStringBlocks = require("./graphQLStringBlocks");

const ContentfulActivityFeedItems = {
  getAll: async function () {
    const query = `{
      activityFeedItemCollection {
        total
        items {
          title
          type
          date
          description
          link
          videoEmbed {
            title
            embedUrl
          }
          tweetEmbed {
            tweetUrl
          }
          image {
            ${GraphQLStringBlocks.imageAsset()}
          }
        }
      }
    }`;

    const response = await ContentfulApi.callContentful(query);

    const activityFeed = response.data.activityFeedItemCollection.items
      ? response.data.activityFeedItemCollection.items
      : [];

    return activityFeed;
  },
};

module.exports = ContentfulActivityFeedItems;
