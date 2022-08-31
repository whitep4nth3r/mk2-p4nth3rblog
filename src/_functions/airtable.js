var Airtable = require("airtable");

exports.handler = async function (event, context, callback) {
  let statusCode = 200;
  const airtable_name = "blog_page_layout";

  // get cookie value from POST
  const { cookieValue } = JSON.parse(event.body);

  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  var base = Airtable.base(process.env.AIRTABLE_BASE_ID);

  // get record from DB if exists
  const record = await base(airtable_name)
    .select({
      maxRecords: 1,
      view: "Grid view",
      filterByFormula: `{nf_ab_value} = ${cookieValue}`,
      fields: ["nf_ab_value", "branch", "page_views"],
    })
    .all()
    .then(async (results) => {
      if (results.length > 0) {
        // if record exists, increment page view and save
        const row = results[0];
        const currentPageViews = row.fields.page_views;

        const update = await base(airtable_name).update(
          [
            {
              id: row.id,
              fields: {
                page_views: currentPageViews + 1,
              },
            },
          ],
          function (err, records) {
            if (err) {
              console.error(err);
              return;
            }
            records.forEach(function (record) {
              console.log(`Page views updated to ${record.get("page_views")} for record ID: ${record.getId()}`);
            });
          },
        );
      } else {
        // add new record with 1 page view
        statusCode = 201;

        const create = await base(airtable_name).create(
          [
            {
              fields: {
                nf_ab_value: cookieValue,
                branch: process.env.BRANCH,
                page_views: 1,
              },
            },
          ],
          function (err, records) {
            if (err) {
              console.error(err);
              return;
            }
            records.forEach(function (record) {
              console.log(`Record created for record ID: ${record.getId()}`);
            });
          },
        );
      }
    });

  return {
    statusCode,
    body: JSON.stringify({
      message: "Tracked in Airtable",
    }),
  };
};
