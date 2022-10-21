const ContentfulBlogPosts = require("../../lib/contentfulBlogPosts");
const ContentfulTopics = require("../../lib/contentfulTopics");
const fetch = require("node-fetch");

module.exports = async function () {
  const topics = await ContentfulTopics.getAll();
  const postSummaries = await ContentfulBlogPosts.getAllSummaries();
  const posts = await ContentfulBlogPosts.getAll();

  return {
    postSummaries,
    posts,
    topics,
  };
};
