const ContentfulBlogPosts = require("../../lib/contentfulBlogPosts");

module.exports = async function () {
  const postSummaries = await ContentfulBlogPosts.getAllSummaries();
  const posts = await ContentfulBlogPosts.getAll();
  return {
    postSummaries,
    posts,
  };
};
