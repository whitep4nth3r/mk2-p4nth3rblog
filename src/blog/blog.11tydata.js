const ContentfulBlogPosts = require("../../lib/contentfulBlogPosts");

module.exports = async function () {
  const posts = await ContentfulBlogPosts.getAll();

  return {
    posts,
    count: posts.length,
  };
};
