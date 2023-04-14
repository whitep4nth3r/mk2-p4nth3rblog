const BioImage = require("./bioImage");
const TwitterIcon = require("./svg/twitterIcon");
const TwitchIcon = require("./svg/twitchIcon");
const GitHubIcon = require("./svg/githubIcon");

function BlogSidebarAuthor({ author }) {
  return /*html*/ `
  <div class="blogSidebarAuthor">
    <div class="blogSidebarAuthor__imgContainer">
      ${BioImage({ image: author.imageBio })}
    </div>
    <a href="/about/" class="blogSidebarAuthor__cta">About Salma <span aria-hidden="true">→</span></a>
    <div class="blogSidebarAuthor_social">
      <a href="https://twitch.tv/whitep4nth3r" class="blogSidebarAuthor_socialLink" aria-label="Twitch channel">${TwitchIcon()}</a>
      <a href="https://github.com/whitep4nth3r" class="blogSidebarAuthor_socialLink" aria-label="GitHub profile">${GitHubIcon()}</a>
      <a href="https://twitter.com/whitep4nth3r" class="blogSidebarAuthor_socialLink" aria-label="Twitter profile">${TwitterIcon()}</a>
    </div>
  </div>
  `;
}

module.exports = BlogSidebarAuthor;
