const ContentfulBlogPosts = require("../../lib/contentfulBlogPosts");
const getRandomEntry = require("@whitep4nth3r/get-random-entry");

module.exports = async function () {
  const allPosts = await ContentfulBlogPosts.getAll();
  const posts2022Onwards = allPosts.filter((post) => post.date > "2022-01-00T00:00:00.000Z");
  const randomBlogPost = getRandomEntry.getRandomEntry(posts2022Onwards);
  return randomBlogPost;
};
