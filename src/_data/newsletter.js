module.exports = async function () {
  let subscribers;
  try {
    const response = await fetch(
      `https://api.buttondown.email/v1/subscribers`,
      {
        headers: {
          Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
        },
      },
    );

    const result = await response.json();
    subscribers = result.count.toString();
  } catch (error) {
    console.log(error);
    subscribers = "200";
  }

  return {
    subscribers,
  };
};
