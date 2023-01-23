exports.handler = async function (event, context) {
  if (event.queryStringParameters.secret === process.env.DEPLOY_ME_SECRET) {
    const response = await fetch(process.env.DEPLOY_ME_URL, {
      method: "POST",
    });

    return {
      statusCode: 200,
      body: "Your site is now deploying! Have a great day!",
    };
  } else {
    return {
      statusCode: 403,
      body: "Access denied! Please include the correct secret URL parameter.",
    };
  }
};
