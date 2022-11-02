const ContentfulBlogPosts = require("../../lib/contentfulBlogPosts");

module.exports = async function () {
  const postSummaries = await ContentfulBlogPosts.getAllSummaries();

  return postSummaries;
};
