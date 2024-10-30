const DiscordIcon = require("./svg/discordIcon");
const GithubIcon = require("./svg/githubIcon");
const TwitchIcon = require("./svg/twitchIcon");
const YouTubeIcon = require("./svg/youtubeIcon");
const BlueskyIcon = require("./svg/blueskyIcon");
const FeedIcon = require("./svg/feedIcon");

function SocialLinks() {
  return /*html*/ `
  <ul class="socialLinks">
    <li>
      <a href="https://twitch.tv/whitep4nth3r" class="socialLinks__item" target="_blank" rel="nofollow noreferrer" aria-label="Follow on Twitch">${TwitchIcon()}</a>
    </li>
    <li>
      <a href="https://github.com/whitep4nth3r" class="socialLinks__item" target="_blank" rel="nofollow noreferrer" aria-label="View on GitHub">${GithubIcon()}</a>
    </li>
      <li>
      <a href="https://twitter.com/whitep4nth3r" class="socialLinks__item" target="_blank" rel="nofollow noreferrer" aria-label="Follow on Bluesky">${BlueskyIcon()}</a>
    </li>
    <li>
      <a href="https://youtube.com/whitep4nth3r" class="socialLinks__item" target="_blank" rel="nofollow noreferrer" aria-label="Subscribe on YouTube">${YouTubeIcon()}</a>
    </li>
    <li>
      <a href="/discord" class="socialLinks__item" target="_blank" rel="nofollow noreferrer" aria-label="Join Discord">${DiscordIcon()}</a>
    </li>
    <li>
      <a href="/feed.xml" class="socialLinks__item" target="_blank" aria-label="Subscribe to RSS Feed">${FeedIcon()}</a>
    </li>
  </ul>
  `;
}

module.exports = SocialLinks;
