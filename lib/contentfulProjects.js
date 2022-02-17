const ContentfulApi = require("./contentfulApi");
const GitHubApi = require("./githubApi");
const GraphQLStringBlocks = require("./graphQLStringBlocks.js");

const ContentfulProjects = {
  getAll: async function () {
    const query = `{
      projectCollection(order: [order_ASC]) {
        total
        items {
          sys {
            id
          }
          name
          description
          link
          linkText
          gitHubRepoName
          image {
            ${GraphQLStringBlocks.imageAsset()}
          }
        }
      }
    }`;

    const response = await ContentfulApi.callContentful(query);

    const projectCollection = response.data.projectCollection.items ? response.data.projectCollection.items : [];

    const mergeProjectsWithGitHubData = async (_) => {
      const promises = projectCollection.map(async (project) => {
        return {
          ...project,
          gitHubStats: await GitHubApi.getRepoForksAndStars(project.gitHubRepoName),
        };
      });

      return await Promise.all(promises);
    };

    const fullData = await mergeProjectsWithGitHubData();

    return fullData;
  },
};

module.exports = ContentfulProjects;
