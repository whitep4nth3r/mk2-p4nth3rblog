const ContentfulProjects = require("../../lib/contentfulProjects");

module.exports = async function () {
  const projects = await ContentfulProjects.getAll();
  return {
    projects,
  };
};
