const ContentfulThingsIUse = require("../../lib/contentfulThingsIUse");

module.exports = async function () {
  const things = await ContentfulThingsIUse.getAll();

  return {
    things,
  };
};
