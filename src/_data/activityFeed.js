const ContentfulEvents = require("../../lib/contentfulEvents.js");
const ContentfulActivityFeedItems = require("../../lib/contentfulActivityFeedItems");
const ContentfulBlogPosts = require("../../lib/contentfulBlogPosts");
const ContentfulTalks = require("../../lib/contentfulTalks");
const DateUtils = require("../../lib/dateUtils");

module.exports = async function () {
  const eventsData = await ContentfulEvents.getAll({ future: false });
  const pastEvents = eventsData.map((event) => ({ ...event, type: "event" }));

  const postData = await ContentfulBlogPosts.getAllSummaries();
  const postSummaries = postData.map((item) => ({ ...item, type: "post" }));

  const talkData = await ContentfulTalks.getAllSummaries();
  const talkSummaries = talkData.map((item) => ({ ...item, type: "talk" }));

  const feedItems = await ContentfulActivityFeedItems.getAll();

  const allItems = [...pastEvents, ...feedItems, ...postSummaries, ...talkSummaries].sort(
    DateUtils.sortItemsByDateDesc
  );

  return allItems;
};
