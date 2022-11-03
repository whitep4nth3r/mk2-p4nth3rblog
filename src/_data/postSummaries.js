const ContentfulBlogPosts = require("../../lib/contentfulBlogPosts");

module.exports = async function () {
  const data = await ContentfulBlogPosts.getAllSummaries();
  const postSummaries = data.map((item) => ({ ...item, type: "postSummary" }));

  return postSummaries;
};
