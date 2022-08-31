const fetch = require("node-fetch");
var Airtable = require("airtable");

exports.handler = async function (event, context, callback) {
  const blogPageLayoutId = "tbl88pesgQivFFgtm";

  // get cookie value from POST
  const { cookieValue } = event.body;

  // get branch from env
  const branch = process.env.BRANCH;

  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  var base = Airtable.base(process.env.AIRTABLE_BASE_ID);

  // console.log(base);

  // get record from DB if exists
  // const record = base("blog_page_layout")
  //   .select({
  //     // Selecting the first 3 records in Grid view:
  //     maxRecords: 1,
  //     view: "Grid view",
  //     filterByFormula: ({ nf_ab_value } = "0.567"),
  //   })
  //   .eachPage(
  //     function page(records, fetchNextPage) {
  //       // This function (`page`) will get called for each page of records.

  //       records.forEach(function (record) {
  //         console.log("Retrieved", record.get("nf_ab_value"));
  //       });

  //       fetchNextPage();
  //     },
  //     function done(err) {
  //       if (err) {
  //         console.error(err);
  //         return;
  //       }
  //     },
  //   );

  // console.log(record);

  // if exists, incrememnt page view

  // if !exists, add record with 1 page view

  return {
    statusCode: 200,
    body: JSON.stringify({
      called: true,
    }),
  };
};
