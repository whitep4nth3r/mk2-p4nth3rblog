const ContentfulBlogPosts = require("../../lib/contentfulBlogPosts");
const ContentfulTopics = require("../../lib/contentfulTopics");

module.exports = async function () {
  const topics = await ContentfulTopics.getAll();
  const posts = await ContentfulBlogPosts.getAll();

  return {
    posts,
    topics,
  };
};
