const ContentfulTalks = require("../../lib/contentfulTalks");

module.exports = async function () {
  const talkSummaries = await ContentfulTalks.getAllSummaries();
  const talks = await ContentfulTalks.getAll();
  return {
    talkSummaries,
    talks,
  };
};
