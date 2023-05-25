const ContentfulApi = require("./contentfulApi.js");

const ContentfulPages = {
  get: async function ({ slug }) {
    const variables = { slug };

    const query = `query GetPage($slug: String!) {
      pageCollection(where: { slug: $slug }) {
          items {
            title
            slug
            metaTitle
            metaDescription
            body {
              json
            }
          }
        }
    }`;

    const response = await ContentfulApi.callContentful(query, variables);

    const pageCollection = response.data.pageCollection.items
      ? response.data.pageCollection.items
      : [];

    return pageCollection[0];
  },
};

module.exports = ContentfulPages;
