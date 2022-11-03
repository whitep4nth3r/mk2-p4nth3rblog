const ContentfulTalks = require("../../lib/contentfulTalks");

module.exports = async function () {
  const talks = await ContentfulTalks.getAll();
  return {
    talks,
  };
};
