const ContentfulEvents = require("../../lib/contentfulEvents.js");

module.exports = async function () {
  const futureEvents = await ContentfulEvents.getAll({ future: true });
  const pastEvents = await ContentfulEvents.getAll({ future: false });
  const allEvents = [...futureEvents, ...pastEvents].map((event) => ({ ...event, type: "event" }));

  return allEvents;
};
