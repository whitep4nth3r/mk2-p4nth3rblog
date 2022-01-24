const ContentfulApi = require("../../lib/api.js");
const GraphQLStringBlocks = require("../../lib/graphQLStringBlocks.js");

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
          description
          link
          isAffiliateLink
          customLinkText
          image {
            ${GraphQLStringBlocks.imageAsset()}
          }
        }
      }
    }`;

    const response = await ContentfulApi.callContentful(query);

    const thingIUseCollection = response.data.thingIUseCollection.items ? response.data.thingIUseCollection.items : [];

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

    const thingIUseCollection = response.data.thingIUseCollection.items ? response.data.thingIUseCollection.items : [];

    const categories = new Set();

    thingIUseCollection.map((thing) => {
      return thing.categories.forEach((cat) => categories.add(cat));
    });

    return Array.from(categories);
  },
};

module.exports = async function () {
  const categories = await ContentfulThingsIUse.getCategories();
  const allThings = await ContentfulThingsIUse.getAll();

  return {
    categories,
    allThings,
  };
};
