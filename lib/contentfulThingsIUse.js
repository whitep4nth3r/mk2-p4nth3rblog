const ContentfulApi = require("./contentfulApi.js");
const GraphQLStringBlocks = require("./graphQLStringBlocks.js");

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

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
          category
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
          category
        }
      }
    }`;

    const response = await ContentfulApi.callContentful(query);

    const thingIUseCollection = response.data.thingIUseCollection.items
      ? response.data.thingIUseCollection.items
      : [];

    const categories = thingIUseCollection.map((item) => item.category);

    return categories.filter(onlyUnique);
  },
};

module.exports = ContentfulThingsIUse;
