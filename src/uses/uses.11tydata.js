const ContentfulThingsIUse = require("../../lib/contentfulThingsIUse");

module.exports = async function () {
  const categories = await ContentfulThingsIUse.getCategories();
  const allThings = await ContentfulThingsIUse.getAll();

  const things = {};

  for (let i = 0; i < categories.length; i++) {
    things[categories[i]] = allThings.filter((thing) => thing.categories.includes(categories[i]));
  }

  return {
    categories,
    things,
  };
};
