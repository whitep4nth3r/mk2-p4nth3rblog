const ContentfulApi = require("./contentfulApi.js");

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

module.exports = ContentfulEvents;
