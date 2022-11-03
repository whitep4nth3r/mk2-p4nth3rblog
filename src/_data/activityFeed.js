const ContentfulEvents = require("../../lib/contentfulEvents.js");
const ContentfulActivityFeedItems = require("../../lib/contentfulActivityFeedItems");
const ContentfulBlogPosts = require("../../lib/contentfulBlogPosts");
const ContentfulTalks = require("../../lib/contentfulTalks");
const DateUtils = require("../../lib/dateUtils");

module.exports = async function () {
  const futureEvents = await ContentfulEvents.getAll({ future: true });
  const pastEvents = await ContentfulEvents.getAll({ future: false });
  const allEvents = [...futureEvents, ...pastEvents].map((event) => ({ ...event, type: "event" }));

  const postData = await ContentfulBlogPosts.getAllSummaries();
  const postSummaries = postData.map((item) => ({ ...item, type: "postSummary" }));

  const talkData = await ContentfulTalks.getAllSummaries();
  const talkSummaries = talkData.map((item) => ({ ...item, type: "talkSummary" }));

  const feedItems = await ContentfulActivityFeedItems.getAll();

  const allItems = [...allEvents, ...feedItems, ...postSummaries, ...talkSummaries].sort(DateUtils.sortItemsByDateDesc);

  return allItems;
};
