const ContentfulEvents = require("../../lib/contentfulEvents.js");
const ContentfulActivityFeedItems = require("../../lib/contentfulActivityFeedItems");

module.exports = async function () {
  const futureEvents = await ContentfulEvents.getAll({ future: true });
  const pastEvents = await ContentfulEvents.getAll({ future: false });
  const allEvents = [...futureEvents, ...pastEvents].map((event) => ({ ...event, type: "event" }));

  const feedItems = await ContentfulActivityFeedItems.getAll();

  const allItems = [...allEvents, ...feedItems];
  return allItems;
};
