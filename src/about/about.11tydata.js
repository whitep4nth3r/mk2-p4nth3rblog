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
          description
          timeTbc
          isVirtual
          image {
            url
            description
            height
            width
          }
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
    return { ...ev, type: "db" };
  });

  const twitch = await fetch(`${process.env.DOMAIN}/api/twitch`);
  const twitchData = await twitch.json();
  const twitchStreams = twitchData.schedule.data.segments;

  const twitchEvents = twitchStreams.map((ev) => {
    return {
      ...ev,
      date: ev.start_time,
      name: ev.title,
      link: "https://twitch.tv/whitep4nth3r/schedule",
      type: "twitch",
    };
  });

  const testEvents = [
    {
      sys: { id: "1UWL3RL6T3tzG8SCZz45ne" },
      date: "2022-03-16T19:00:00.000+01:00",
      name: "TEST EVENT - Ecomm & Next.js - Ecommerce on the Jamstack with Colby Fayock",
      link: "https://www.youtube.com/watch?v=GyXyygeC2RE",
      description:
        "I join Colby Fayock to chat about Next.js and how all of its features help enable developers to build great experiences on the web.",
      timeTbc: false,
      isVirtual: true,
      type: "db",
      image: {
        url: "https://images.ctfassets.net/56dzm01z6lln/3CPNMiFN8vtrQKfrvTWJPe/bf859c4804f45579be0cce7ced44d4a3/maxresdefault.jpg",
        description:
          'A Youtube thumbnail featuring my headshot against a red background on the left, Colby on the right pulling a silly face, and the title in the middle which reads "Ecomm & Next.js. Ecommerce on the Jamstack."',
        height: 720,
        width: 1280,
      },
    },
    {
      sys: { id: "28NyXdVJsoMrBWe1yvw7Uo" },
      date: "2022-04-01T17:00:00.000+01:00",
      name: "TEST EVENT - Building with Next.js | Cassidy Williams and Salma Alam-Naylor | Architecting with Next.js 2021",
      link: "https://www.youtube.com/watch?v=BqQcgHEif5s&t=37s",
      description:
        "In this fireside chat, I join Cassidy Williams of Netlify to talk about the performance benefits of Next.js, and how developers can make the most of the framework.",
      timeTbc: false,
      isVirtual: true,
      type: "db",
      image: {
        url: "https://images.ctfassets.net/56dzm01z6lln/kQD5RbOGmBwTeERr0ntWj/2358943065d652e9b83dfff1ea037842/architecting_nextjs_aug_2021.jpeg",
        description:
          'A thumbnail of Salma Alam-Naylor and Cassidy Williams with the title "Architecting with Next.js" and the Netlify, Next.js and Contentful logos.',
        height: 1260,
        width: 2400,
      },
    },
  ];

  const allEvents = dbEvents.concat(twitchEvents).concat(testEvents);
  const sortedEvents = allEvents.sort(sortItemsByDateAsc);

  return {
    person,
    events: sortedEvents,
    onVacation: twitchData.schedule.data.vacation,
  };
};
