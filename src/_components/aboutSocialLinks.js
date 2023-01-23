const DiscordIcon = require("./svg/discordIcon");
const GithubIcon = require("./svg/githubIcon");
const TwitchIcon = require("./svg/twitchIcon");
const TwitterIcon = require("./svg/twitterIcon");
const YoutubeSquare = require("./svg/youtubeSquare");
const DevIcon = require("./svg/devIcon");
const FeedIcon = require("./svg/feedIcon");
const MastodonIcon = require("./svg/mastodonIcon");

function AboutSocialLinks() {
  return /*html*/ `
  <ul class="about__socialLinks">
    <li>
      <a href="https://twitch.tv/whitep4nth3r" class="about__socialLinksItem" target="_blank" rel="nofollow noreferrer">${TwitchIcon()} Twitch</a>
    </li>
    <li>
      <a href="/discord" class="about__socialLinksItem" target="_blank" rel="nofollow noreferrer">${DiscordIcon()} Discord</a>
    </li>
        <li>
      <a href="https://github.com/whitep4nth3r" class="about__socialLinksItem" target="_blank" rel="nofollow noreferrer">${GithubIcon()} Github</a>
    </li>
    <li>
      <a href="https://indieweb.social/@whitep4nth3r" class="about__socialLinksItem" target="_blank" rel="nofollow noreferrer">${MastodonIcon()} Mastodon</a>
    </li>
    <li>
      <a href="https://twitter.com/whitep4nth3r" class="about__socialLinksItem" target="_blank" rel="nofollow noreferrer">${TwitterIcon()} Twitter</a>
    </li>
    <li>
      <a href="https://youtube.com/whitep4nth3r" class="about__socialLinksItem" target="_blank" rel="nofollow noreferrer">${YoutubeSquare()} YouTube</a>
    </li>
    <li>
      <a href="/feed.xml" class="about__socialLinksItem" target="_blank">${FeedIcon()} Feed</a>
    </li>
  </ul>
  `;
}

module.exports = AboutSocialLinks;
