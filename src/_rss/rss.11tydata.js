const ContentfulTalks = require("../../lib/contentfulTalks");
const ContentfulBlogPosts = require("../../lib/contentfulBlogPosts");
const DateUtils = require("../../lib/dateUtils");

module.exports = async function () {
  const posts = await ContentfulBlogPosts.getAll();
  const talks = await ContentfulTalks.getAll();
  const allItems = posts.concat(talks);
  const sortedItems = allItems.sort(DateUtils.sortItemsByDate);
  return {
    sortedItems,
  };
};
