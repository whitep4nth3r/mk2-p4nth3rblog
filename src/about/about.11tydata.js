require("dotenv").config();
const fetch = require("node-fetch");

const ContentfulApi = require("../../lib/contentfulApi.js");
const GraphQLStringBlocks = require("../../lib/graphQLStringBlocks.js");

function sortItemsByDateAsc(a, b) {
  const a_timestamp = Date.parse(a.date);
  const a_date = new Date(a_timestamp);

  const b_timestamp = Date.parse(b.date);
  const b_date = new Date(b_timestamp);

  return a_date - b_date;
}

function removeTwitchStreamsWhenOnVacation(events, startTime, endTime) {
  return events.filter((ev) => ev.date < startTime || ev.date > endTime);
}

const ContentfulEvents = {
  /*
   * Get events
   */
  getAll: async function ({ future }) {
    // Calculate date_ASC for future events, or date_DESC for past events
    const order = future ? "date_ASC" : "date_DESC";

    // Generate today's date
    const date = new Date();

    // And format it to an ISO String
    const formattedDate = date.toISOString();

    // Decide on the date filter to pass in as a string
    const dateFilter = future ? "date_gt" : "date_lt";

    // Construct variables object to send with the HTTP POST request
    const variables = { date: formattedDate, order };

    // Build the query
    const query = `query GetEvents($date: DateTime!, $order: [EventOrder]!) {
      eventCollection(where: {${dateFilter}: $date}, order: $order) {
        items {
          sys {
            id
          }
          date
          name
          link
        }
      }
    }`;

    const response = await ContentfulApi.callContentful(query, variables);

    const eventCollection = response.data.eventCollection.items ? response.data.eventCollection.items : [];

    return eventCollection;
  },
};

const ContentfulPerson = {
  /*
   * Get my info
   */
  get: async function () {
    const variables = { slug: "whitep4nth3r" };

    const query = `query GetPerson($slug: String!) {
       personCollection(where: { slug: $slug }) {
          items {
            imageBio {
              ${GraphQLStringBlocks.imageAsset()}
            }
            bioShort
            bioSpeaker
            bioLong {
              json
            }
          }
        }
    }`;

    const response = await ContentfulApi.callContentful(query, variables);

    const personCollection = response.data.personCollection.items ? response.data.personCollection.items : [];

    return personCollection[0];
  },
};

module.exports = async function () {
  const person = await ContentfulPerson.get();
  const futureEvents = await ContentfulEvents.getAll({ future: true });

  const dbEvents = futureEvents.map((ev) => {
    return { ...ev, type: ev.link.includes("youtube") ? "youtube" : "db", canceled_until: null };
  });

  const twitch = await fetch(`${process.env.DOMAIN}/api/twitch`);
  const twitchData = await twitch.json();
  const twitchStreams = twitchData.schedule.data.segments;
  const twitchVacation = twitchData.schedule.data.vacation;

  const twitchEvents = twitchStreams.map((ev) => {
    const buffer = Buffer.from(ev.id, "base64");
    const segmentInfo = JSON.parse(buffer);

    return {
      ...ev,
      date: ev.start_time,
      name: ev.title,
      link: `https://www.twitch.tv/whitep4nth3r/schedule?seriesID=${segmentInfo.segmentID}`,
      type: "twitch",
    };
  });

  const filteredTwitchEvents =
    twitchVacation !== null
      ? removeTwitchStreamsWhenOnVacation(twitchEvents, twitchVacation.start_time, twitchVacation.end_time)
      : twitchEvents;

  const allEvents = dbEvents.concat(filteredTwitchEvents);
  const sortedEvents = allEvents.sort(sortItemsByDateAsc);

  return {
    person,
    events: sortedEvents,
  };
};
