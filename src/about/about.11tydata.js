const ContentfulApi = require("../../lib/contentfulApi.js");
const GraphQLStringBlocks = require("../../lib/graphQLStringBlocks.js");

const ContentfulPerson = {
  /*
   * Get my info
   */
  get: async function () {
    const variables = { slug: "whitep4nth3r" };

    const query = `query GetPerson($slug: String!) {
       personCollection(where: { slug: $slug }) {
          items {
            name
            description
            twitterUsername
            gitHubUsername
            twitchUsername
            bioShort
            image {
              ${GraphQLStringBlocks.imageAsset()}
            }
            bioLong {
              json
            }
          }
        }
    }`;

    // Call out to the base API call
    const response = await ContentfulApi.callContentful(query, variables);

    const personCollection = response.data.personCollection.items ? response.data.personCollection.items : [];

    return personCollection[0];
  },
};

module.exports = async function () {
  const person = await ContentfulPerson.get();
  return {
    person,
  };
};
