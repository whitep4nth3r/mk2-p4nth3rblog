const OpenGraph = require("../../lib/openGraph");
const ResponsiveImage = require("../_components/responsiveImage");
const GithubIcon = require("../_components/svg/githubIcon");
const GithubStar = require("../_components/svg/githubStar");
const GithubFork = require("../_components/svg/githubFork");
const GithubIssue = require("../_components/svg/githubIssue");

const pageTitle = "Open source projects maintained by whitep4nth3r";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  metaDescription:
    "Learn about open source projects built on the Jamstack with Eleventy, Next.js, Angular and more. Get involved and open your first PR on GitHub.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imageWidth,
  openGraphImageHeight: OpenGraph.imageHeight,
  openGraphUrl: "https://whitep4nth3r.com/projects/",
};

exports.render = function (data) {
  const { projects } = data;
  return /* html */ `
  <section>
     <div class="projects__header">
        <h1 class="projects__headerTitle">build <span class="colorHighlight">stuff</span></h1>
    </div>
   <ol class="projects__grid">
      ${projects
        .map(
          (project) =>
            /* html */
            `<li class="project">

              <div class="project__image">
                ${ResponsiveImage({ image: project.image })}
              </div>

              <h2 class="project__name">${project.name}</h2>

              <div class="project__stats">
                <span class="project__statsItem">
                  ${GithubStar()}
                  <span>
                    ${project.gitHubStats.stargazerCount} <span class="project__statsItemDeet">stars</span>
                  </span>
                </span>

                <span class="project__statsItem">
                  ${GithubFork()}
                  <span>
                    ${project.gitHubStats.forkCount} <span class="project__statsItemDeet">forks</span>
                  </span>
                </span>

                <span class="project__statsItem">
                  ${GithubIssue()}
                  <span>
                    ${project.gitHubStats.issues.totalCount} <span class="project__statsItemDeet">issues</span>
                  </span>
                </span>
            </div>
            
            <p class="project__description">${project.description}</p>
          
              <a href="https://github.com/whitep4nth3r/${project.gitHubRepoName}"
                class="project__viewSource"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View ${project.gitHubRepoName} repository on GitHub">
                  ${GithubIcon()}
                  <span>
                    View source
                  </span>
                  <span role="presentation">→</span>
              </a>

            <a href="${project.link}" class="project__link" target="_blank" rel="noopener noreferrer">
              ${project.linkText} <span role="presentation">→</span>
            </a>

        </li>`,
        )
        .join("")}
    </ol>
    </section>
   `;
};
