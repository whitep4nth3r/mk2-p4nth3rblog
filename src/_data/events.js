require("dotenv").config();

const ContentfulEvents = require("../../lib/contentfulEvents.js");
const DateUtils = require("../../lib/dateUtils");

module.exports = async function () {
  const futureEvents = await ContentfulEvents.getAll({ future: true });

  const dbEvents = futureEvents.map((ev) => {
    return {
      ...ev,
      type: ev.link?.includes("youtube") ? "youtube" : "db",
    };
  });

  return {
    list: dbEvents,
  };
};
