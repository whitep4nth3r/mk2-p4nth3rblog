const ContentfulApi = require("./contentfulApi.js");
const Config = require("./config.js");
const GraphQLStringBlocks = require("./graphQLStringBlocks.js");

const ContentfulTalks = {
  /*
   * Get all talks
   */
  getAll: async function () {
    let page = 1;
    let shouldQueryMoreTalks = true;
    const returnTalks = [];

    while (shouldQueryMoreTalks) {
      const response = await ContentfulTalks.getPaginated(page);

      if (response.talks.length > 0) {
        returnTalks.push(...response.talks);
      }

      shouldQueryMoreTalks = returnTalks.length < response.total;
      page++;
    }

    return returnTalks;
  },
  /*
   * Get talks by page
   * param: page (number)
   */
  getPaginated: async function (page) {
    const queryLimit = 8;
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;

    const variables = { skip, limit: queryLimit };

    const query = `query GetPaginated($limit: Int!, $skip: Int!) {
        talkCollection(limit: $limit, skip: $skip, order: date_DESC) {
          total
          items {
            sys {
              id
            }
            title
            date
            watchTime
            slug
            metaDescription
            excerpt
            ${GraphQLStringBlocks.authorFull()}
            abstract {
              json
            }
            transcript {
              json
            }
            screenshot {
              ${GraphQLStringBlocks.imageAsset()}
            }
            speakerDeckLink {
              link
              title
              image {
                ${GraphQLStringBlocks.imageAsset()}
              }
            }
            recording {
              embedUrl
              title
            }
            ${GraphQLStringBlocks.topicsCollection()}
          }
        }
      }`;

    const response = await ContentfulApi.callContentful(query, variables);

    const { total } = response.data.talkCollection;
    const talks = response.data.talkCollection.items ? response.data.talkCollection.items : [];

    return { talks, total };
  },

  /*
   * Get talks summaries for talk index page
   * param: page (number)
   */
  getPaginatedSummaries: async function (page) {
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip = skipMultiplier > 0 ? Config.pagination.pageSize * skipMultiplier : 0;

    const variables = { skip, limit: Config.pagination.pageSize };

    const query = `query GetPaginatedSummaries($skip: Int!, $limit: Int!) {
        talkCollection(limit: $limit, skip: $skip, order: date_DESC) {
          total
          items {
            sys {
              id
            }
            title
            date
            watchTime
            slug
            excerpt
            ${GraphQLStringBlocks.authorFull()}
            screenshot {
              ${GraphQLStringBlocks.imageAsset()}
            }
            speakerDeckLink {
              image {
                ${GraphQLStringBlocks.imageAsset()}
              }
            }
            ${GraphQLStringBlocks.topicsCollection()}
          }
        }
      }`;

    const response = await ContentfulApi.callContentful(query, variables);

    const { total } = response.data.talkCollection;
    const talks = response.data.talkCollection.items ? response.data.talkCollection.items : [];

    return { talks, total };
  },

  /*
   * Get all blog posts as summaries for blog index pages
   */
  getAllSummaries: async function () {
    let page = 1;
    let shouldQueryMoreTalks = true;
    const returnTalks = [];

    while (shouldQueryMoreTalks) {
      const response = await ContentfulTalks.getPaginatedSummaries(page);

      if (response.talks.length > 0) {
        returnTalks.push(...response.talks);
      }

      shouldQueryMoreTalks = returnTalks.length < response.total;
      page++;
    }

    return returnTalks;
  },
};

module.exports = ContentfulTalks;
