require("dotenv").config();

module.exports = {
  ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
  ALGOLIA_SEARCH_API_KEY: process.env.ALGOLIA_SEARCH_API_KEY,
  ALGOLIA_INDEX: "p4nth3rblog",
};
