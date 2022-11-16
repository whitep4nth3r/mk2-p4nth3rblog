const ContentfulApi = require("../../lib/contentfulApi");
const GraphQLStringBlocks = require("../../lib/graphQLStringBlocks");

async function getLatestBlogPost() {
  const variables = { limit: 1 };

  const query = `query GetLatestBlogPost($limit: Int!) {
    blogPostCollection(limit: $limit, order: date_DESC) {
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
  const posts = response.data.blogPostCollection.items ? response.data.blogPostCollection.items : [];
  return posts[0];
}

module.exports = async function () {
  const latestPost = await getLatestBlogPost();

  return latestPost;
};
