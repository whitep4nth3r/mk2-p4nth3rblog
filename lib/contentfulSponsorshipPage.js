const ContentfulApi = require("./contentfulApi.js");

const ContentfulSponsorshipPage = {
  get: async function ({ slug }) {
    const variables = { slug };

    const query = `query GetSponsorShipPage($slug: String!) {
      sponsorshipPageCollection(where: { slug: $slug }) {
        items {
          title
          metaTitle
          slug
          intro
          packagesIntro
          streamsIntro
          technicalTutorials
          demoAppsAndWebsites
          videoContent
          streamPackagesCollection {
            items {
              title
              description
            }
          }
        }
      }
    }`;

    const response = await ContentfulApi.callContentful(query, variables);

    const sponsorshipPageCollection = response.data.sponsorshipPageCollection.items
      ? response.data.sponsorshipPageCollection.items
      : [];

    return sponsorshipPageCollection[0];
  },
};

module.exports = ContentfulSponsorshipPage;
