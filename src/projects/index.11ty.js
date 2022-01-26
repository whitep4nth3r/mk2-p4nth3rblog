const OpenGraph = require("../../lib/openGraph");
const ResponsiveImage = require("../_components/responsiveImage");
const pageTitle = "Level up your skills with open source projects";
var md = require("markdown-it")({
  html: true,
});

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription: "Get involved with open source projects built live on Twitch with whitep4nth3r",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imageWidth,
  openGraphImageHeight: OpenGraph.imageHeight,
};

exports.render = function (data) {
  const { projects } = data;
  return /* html */ `
   <ol>
      ${projects.map(
        (project) =>
          /* html */
          `<li>
          ${ResponsiveImage({ image: project.image })}
          <div>
            <h2>${project.name}</h2>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank" rel="noopener noreferrer">
              ${project.linkText} →
            </a>
            <a
              href="https://github.com/whitep4nth3r/${project.gitHubRepoName}"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View ${project.gitHubRepoName} repository on GitHub">
              <div
                aria-label="${project.gitHubRepoName} repository has ${
            project.gitHubStats.stargazerCount
          } stars on GitHub">
                <span>
                  <!-- <Star /> -->
                </span>
                ${project.gitHubStats.stargazerCount}
              </div>
              <div aria-label="${project.gitHubRepoName} repository has been forked ${
            project.gitHubStats.forkCount
          } times on GitHub">
                <span>
                  <!-- <Fork /> -->
                </span>
                ${project.gitHubStats.forkCount}
              </div>
              <div>
                <span>
                  <!-- <Octocat /> -->
                </span>
                View source
              </div>
            </a>
          </div>
        </li>`,
      )}
    </ol>
   `;
};
