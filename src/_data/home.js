const ContentfulActivityFeedItems = require("../../lib/contentfulActivityFeedItems.js");
const ContentfulBlogPosts = require("../../lib/contentfulBlogPosts.js");

module.exports = async function () {
  const postData = await ContentfulBlogPosts.getAllSummaries();
  const postSummaries = postData.map((item) => ({ ...item, type: "post" })).slice(0, 3);

  const feedItems = await ContentfulActivityFeedItems.getAll();
  const shortFeed = feedItems.slice(0, 3);

  return {
    posts: postSummaries,
    stuff: shortFeed,
  };
};
