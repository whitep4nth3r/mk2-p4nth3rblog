const ContentfulSponsorshipPage = require("../../lib/contentfulSponsorshipPage");

module.exports = async function () {
  const sponsorshipsContent = await ContentfulSponsorshipPage.get({ slug: "sponsorships" });

  return { sponsorshipsContent };
};
