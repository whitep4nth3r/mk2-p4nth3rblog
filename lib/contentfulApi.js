require("dotenv").config();
const fetch = require("node-fetch");

const ContentfulApi = {
  defaultOptions: {
    preview: false,
  },
  /*
   * Call the Contentful GraphQL Api
   * param: query (string)
   */
  callContentful: async function (query, variables = {}, options = ContentfulApi.defaultOptions) {
    const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

    const accessToken = options.preview
      ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
      : process.env.CONTENTFUL_ACCESS_TOKEN;

    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    };

    try {
      const data = await fetch(fetchUrl, fetchOptions).then((response) => response.json());
      return data;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = ContentfulApi;
