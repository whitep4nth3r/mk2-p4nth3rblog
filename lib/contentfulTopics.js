const ContentfulApi = require("./contentfulApi.js");
const GraphQLStringBlocks = require("./graphQLStringBlocks.js");
const DateUtils = require("./dateUtils");

const ContentfulTopics = {
  /*
   * Get all topics
   */
  getAll: async function () {
    const query = `
    {
      topicCollection(order: name_ASC) {
        items {
          sys {
            id
          }
          slug
          name
          icon {
            description
            url
          }
        }
      }
    }
    `;

    const response = await ContentfulApi.callContentful(query);

    const topics = response.data.topicCollection.items ? response.data.topicCollection.items : [];

    return topics;
  },
  getPaginatedByTopic: async function (page, topicSlug) {
    const queryLimit = 5;
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;

    const variables = { slug: topicSlug, limit: queryLimit, skip };

    const query = `query GetPaginatedByTopic($slug: String!, $limit: Int!, $skip: Int!) {
      topicCollection(where: { slug: $slug },  limit: 1) {
        items {
          linkedFrom {
            blogPostCollection(limit: $limit, skip: $skip) {
              total
              items {
                sys {
                  id
                }
                slug
                title
                date
                updatedDate
                excerpt
                readingTime
                ${GraphQLStringBlocks.authorBasic()}
                ${GraphQLStringBlocks.topicsCollection()}
                ${GraphQLStringBlocks.featuredImage()}
              }
            }
          }
        }
      }
    }`;

    const response = await ContentfulApi.callContentful(query, variables);

    const results = response.data.topicCollection.items[0].linkedFrom.blogPostCollection
      ? response.data.topicCollection.items[0].linkedFrom.blogPostCollection
      : { total: 0, items: [] };

    return results;
  },
  getAllByTopic: async function (topicSlug) {
    let page = 1;
    let shouldQueryMorePosts = true;
    const returnPosts = [];

    while (shouldQueryMorePosts) {
      const response = await ContentfulTopics.getPaginatedByTopic(page, topicSlug);

      if (response.items.length > 0) {
        returnPosts.push(...response.items);
      }

      shouldQueryMorePosts = returnPosts.length < response.total;
      page++;
    }

    return returnPosts;
  },
  buildAllPosts: async function (topics) {
    const topicToPosts = new Map();

    const buildUpMap = async (_) => {
      const promises = topics.map(async (topic) => {
        const posts = await ContentfulTopics.getAllByTopic(topic.slug);
        topicToPosts.set(topic.slug, posts.sort(DateUtils.sortItemsByDateDesc));
      });

      return await Promise.all(promises);
    };

    await buildUpMap();
    return topicToPosts;
  },
};

module.exports = ContentfulTopics;
