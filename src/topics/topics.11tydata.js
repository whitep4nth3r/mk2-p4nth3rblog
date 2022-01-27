const ContentfulTopics = require("../../lib/contentfulTopics");

module.exports = async function () {
  const topics = await ContentfulTopics.getAll();
  const allPosts = await ContentfulTopics.buildAllPosts(topics);

  return {
    topics,
    allPosts,
  };
};
