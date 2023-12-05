const ContentfulApi = require("./contentfulApi.js");
const Config = require("./config.js");
const GraphQLStringBlocks = require("./graphQLStringBlocks.js");

const ContentfulBlogPosts = {
  /*
   * Get all blog posts
   */
  getAll: async function () {
    let page = 1;
    let shouldQueryMorePosts = true;
    const returnPosts = [];

    while (shouldQueryMorePosts) {
      const response = await ContentfulBlogPosts.getPaginated(page);

      if (response.posts.length > 0) {
        returnPosts.push(...response.posts);
      }

      shouldQueryMorePosts = returnPosts.length < response.total;
      page++;
    }

    return returnPosts;
  },
  /*
   * Get blog posts by page
   * param: page (number)
   */
  getPaginated: async function (page) {
    const queryLimit = 6;
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;

    const variables = { skip, limit: queryLimit };

    const query = `query GetPaginatedSlugs($limit: Int!, $skip: Int!) {
        blogPostCollection(limit: $limit, skip: $skip, order: date_DESC) {
          total
          items {
            sys {
              id
            }
            date
            hideOutOfDateWarning
            updatedDate
            readingTime
            title
            metaTitle
            metaDescription
            slug
            excerpt
            externalUrl
            isSponsored
            ${GraphQLStringBlocks.topicsCollection()}
            ${GraphQLStringBlocks.authorFull()}
            ${GraphQLStringBlocks.relatedPosts()}
            body {
              json
              links {
                entries {
                  inline {
                    sys {
                      id
                    }
                    __typename
                    ... on BlogPost {
                      title
                      slug
                    }
                  }
                  block {
                    sys {
                      id
                    }
                    __typename
                    ${GraphQLStringBlocks.videoEmbed()}
                    ${GraphQLStringBlocks.arcadeEmbed()}
                    ${GraphQLStringBlocks.callout()}
                    ${GraphQLStringBlocks.codeBlock()}
                    ${GraphQLStringBlocks.blogPost()}
                    ${GraphQLStringBlocks.tweetEmbed()}
                    ${GraphQLStringBlocks.codePenEmbed()}
                    ${GraphQLStringBlocks.lighthouseComparison()}
                    ${GraphQLStringBlocks.deployToNetlifyButton()}
                  }
                }
                ${GraphQLStringBlocks.linkedAssets()}
              }
            }
          }
        }
      }`;

    const response = await ContentfulApi.callContentful(query, variables);

    const { total } = response.data.blogPostCollection;
    const posts = response.data.blogPostCollection.items
      ? response.data.blogPostCollection.items
      : [];

    return { posts, total };
  },

  /*
   * Get post summaries for blog index page
   * param: page (number)
   */
  getPaginatedSummaries: async function (page) {
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip = skipMultiplier > 0 ? Config.pagination.pageSize * skipMultiplier : 0;

    const variables = { skip, limit: Config.pagination.pageSize };

    const query = `query GetPaginatedSummaries($skip: Int!, $limit: Int!) {
        blogPostCollection(limit: $limit, skip: $skip, order: date_DESC) {
          total
          items {
            sys {
              id
            }
            date
            updatedDate
            title
            slug
            excerpt
            readingTime
            ${GraphQLStringBlocks.topicsCollection()}
            ${GraphQLStringBlocks.featuredImage()}
            ${GraphQLStringBlocks.authorBasic()}
          }
        }
      }`;

    const response = await ContentfulApi.callContentful(query, variables);

    const { total } = response.data.blogPostCollection;
    const posts = response.data.blogPostCollection.items
      ? response.data.blogPostCollection.items
      : [];

    return { posts, total };
  },

  /*
   * Get all blog posts as summaries for blog index pages
   */
  getAllSummaries: async function () {
    let page = 1;
    let shouldQueryMorePosts = true;
    const returnPosts = [];

    while (shouldQueryMorePosts) {
      const response = await this.getPaginatedSummaries(page);

      if (response.posts.length > 0) {
        returnPosts.push(...response.posts);
      }

      shouldQueryMorePosts = returnPosts.length < response.total;
      page++;
    }

    return returnPosts;
  },
};

module.exports = ContentfulBlogPosts;
