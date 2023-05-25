const ContentfulPages = require("../../lib/contentfulPages");

module.exports = async function () {
  const content = await ContentfulPages.get({ slug: "sponsorships" });

  return { content };
};
