const ContentfulPerson = require("../../lib/contentfulPerson");

module.exports = async function () {
  const person = await ContentfulPerson.get();

  return person;
};
