module.exports = async function () {
  let emails = [];
  try {
    const response = await fetch(`https://api.buttondown.email/v1/emails?ordering=-creation_date`, {
      headers: {
        Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
      },
    });

    emails = await response.json();

    console.log(emails);
  } catch (error) {
    console.log(error);
  }

  return {
    emails: emails.results,
  };
};
