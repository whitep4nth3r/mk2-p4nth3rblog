const ContentfulTalks = require("../../lib/contentfulTalks");

module.exports = async function () {
  const data = await ContentfulTalks.getAllSummaries();
  const talkSummaries = data.map((item) => ({ ...item, type: "talkSummary" }));
  return talkSummaries;
};
