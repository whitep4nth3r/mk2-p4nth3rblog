const ContentfulApi = require("./contentfulApi.js");
const GraphQLStringBlocks = require("./graphQLStringBlocks.js");

const ContentfulTestimonials = {
  get: async function () {
    const query = `{
      testimonialCollection(limit: 10) {
        total
        items {
          name
          image {
            ${GraphQLStringBlocks.imageAsset()}
          }
          quote
          org
          link
        }
      }
    }`;

    const response = await ContentfulApi.callContentful(query);

    const testimonialCollection = response.data?.testimonialCollection.items
      ? response.data.testimonialCollection.items
      : [];

    return testimonialCollection;
  },
};

module.exports = ContentfulTestimonials;
