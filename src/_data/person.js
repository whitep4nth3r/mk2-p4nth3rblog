const ContentfulPerson = require("../../lib/contentfulPerson");

module.exports = async function () {
  const person = await ContentfulPerson.get();

  const headerImage = `${person.imageBio.url}?w=100&q=100`;

  return { data: person, headerImage };
};
