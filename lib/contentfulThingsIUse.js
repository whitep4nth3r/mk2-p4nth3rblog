const ContentfulApi = require("./contentfulApi.js");
const GraphQLStringBlocks = require("./graphQLStringBlocks.js");

const ContentfulThingsIUse = {
  getAll: async function () {
    const query = `{
      thingIUseCollection(order: name_ASC) {
        total
        items {
          sys {
            id
          }
          name
          categories
          image {
            ${GraphQLStringBlocks.imageAsset()}
          }
        }
      }
    }`;

    const response = await ContentfulApi.callContentful(query);

    const thingIUseCollection = response.data.thingIUseCollection.items
      ? response.data.thingIUseCollection.items
      : [];

    return thingIUseCollection;
  },
  getCategories: async function () {
    const query = `{
      thingIUseCollection {
        total
        items {
          categories
        }
      }
    }`;

    const response = await ContentfulApi.callContentful(query);

    const thingIUseCollection = response.data.thingIUseCollection.items
      ? response.data.thingIUseCollection.items
      : [];

    const categories = new Set();

    thingIUseCollection.map((thing) => {
      return thing.categories.forEach((cat) => categories.add(cat));
    });

    return Array.from(categories);
  },
};

module.exports = ContentfulThingsIUse;
